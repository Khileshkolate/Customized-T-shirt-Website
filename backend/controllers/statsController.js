const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

const compactNumber = (value) => {
    const number = Number(value) || 0;

    if (number >= 1000000) {
        return `${Number((number / 1000000).toFixed(1))}M+`;
    }

    if (number >= 1000) {
        return `${Number((number / 1000).toFixed(1))}K+`;
    }

    return number.toString();
};

const formatRating = (rating) => {
    const number = Number(rating) || 0;
    return number > 0 ? `${number.toFixed(1)}/5` : '0/5';
};

const formatDeliveryHours = (hours) => {
    const number = Number(hours);

    if (!Number.isFinite(number) || number <= 0) {
        return '24-48';
    }

    const rounded = Math.max(1, Math.round(number));
    return rounded <= 48 ? rounded.toString() : `${Math.round(rounded / 24)}d`;
};

// @desc    Public homepage analytics, computed from live admin data
// @route   GET /api/stats/public
// @access  Public
const getPublicStats = async (req, res) => {
    try {
        const [
            verifiedCustomers,
            fallbackCustomers,
            soldItems,
            ratingSummary,
            deliverySummary
        ] = await Promise.all([
            User.countDocuments({ role: 'user', isVerified: true }),
            User.countDocuments({ role: 'user' }),
            Order.aggregate([
                { $unwind: '$orderItems' },
                {
                    $group: {
                        _id: null,
                        total: { $sum: { $ifNull: ['$orderItems.qty', 0] } }
                    }
                }
            ]),
            Product.aggregate([
                { $match: { rating: { $gt: 0 } } },
                {
                    $group: {
                        _id: null,
                        weightedRating: {
                            $sum: {
                                $multiply: [
                                    '$rating',
                                    { $cond: [{ $gt: ['$numReviews', 0] }, '$numReviews', 1] }
                                ]
                            }
                        },
                        reviewWeight: {
                            $sum: { $cond: [{ $gt: ['$numReviews', 0] }, '$numReviews', 1] }
                        }
                    }
                }
            ]),
            Order.aggregate([
                {
                    $match: {
                        deliveredAt: { $exists: true, $ne: null },
                        createdAt: { $exists: true, $ne: null }
                    }
                },
                {
                    $project: {
                        hours: {
                            $divide: [
                                { $subtract: ['$deliveredAt', '$createdAt'] },
                                1000 * 60 * 60
                            ]
                        }
                    }
                },
                {
                    $group: {
                        _id: null,
                        averageHours: { $avg: '$hours' }
                    }
                }
            ])
        ]);

        const productsSold = soldItems[0]?.total || 0;
        const averageRating = ratingSummary[0]?.reviewWeight
            ? ratingSummary[0].weightedRating / ratingSummary[0].reviewWeight
            : 0;
        const averageDeliveryHours = deliverySummary[0]?.averageHours;
        const customers = verifiedCustomers || fallbackCustomers;

        res.json({
            success: true,
            data: {
                customers,
                productsSold,
                averageRating,
                averageDeliveryHours,
                tiles: {
                    customers: compactNumber(customers),
                    productsSold: compactNumber(productsSold),
                    averageRating: formatRating(averageRating),
                    deliveryHours: formatDeliveryHours(averageDeliveryHours)
                }
            }
        });
    } catch (error) {
        console.error('Error fetching public stats:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = {
    getPublicStats
};
