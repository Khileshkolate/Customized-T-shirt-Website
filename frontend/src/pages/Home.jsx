import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  ShoppingBag, 
  Palette, 
  Sparkles, 
  Truck, 
  Shield,
  Star,
  ArrowRight,
  TrendingUp,
  Users,
  CheckCircle,
  Heart,
  MessageCircle,
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Package,
  Headphones
} from 'lucide-react'

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [testimonials] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      role: "Startup Founder",
      content: "Amazing quality and service! The custom t-shirts for our team turned out perfect.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Priya Patel",
      role: "Event Organizer",
      content: "Ordered 500 mugs for our conference. Great printing quality and on-time delivery!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Amit Kumar",
      role: "Content Creator",
      content: "The AI design assistant helped create stunning merch for my YouTube channel.",
      rating: 4,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
    }
  ])

  const [designCategories] = useState([
    {
      id: 1,
      name: "T-Shirts",
      icon: "👕",
      count: "500+ Designs",
      color: "from-blue-500 to-cyan-400"
    },
    {
      id: 2,
      name: "Mugs",
      icon: "☕",
      count: "200+ Designs",
      color: "from-amber-500 to-orange-400"
    },
    {
      id: 3,
      name: "Phone Cases",
      icon: "📱",
      count: "300+ Designs",
      color: "from-purple-500 to-pink-400"
    },
    {
      id: 4,
      name: "Hoodies",
      icon: "🧥",
      count: "150+ Designs",
      color: "from-red-500 to-rose-400"
    },
    {
      id: 5,
      name: "Posters",
      icon: "🖼️",
      count: "400+ Designs",
      color: "from-green-500 to-emerald-400"
    },
    {
      id: 6,
      name: "Caps",
      icon: "🧢",
      count: "100+ Designs",
      color: "from-indigo-500 to-violet-400"
    }
  ])

  const stats = [
    { icon: <Users className="h-6 w-6" />, value: '10,000+', label: 'Happy Customers' },
    { icon: <ShoppingBag className="h-6 w-6" />, value: '50,000+', label: 'Products Sold' },
    { icon: <Star className="h-6 w-6" />, value: '4.8/5', label: 'Customer Rating' },
    { icon: <Truck className="h-6 w-6" />, value: '24-48', label: 'Hour Delivery' }
  ]

  const features = [
    {
      icon: <Palette className="h-8 w-8" />,
      title: 'Easy Design Tool',
      description: 'Drag & drop interface for easy customization'
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: 'AI Design Assistant',
      description: 'Get design suggestions powered by AI'
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'Quality Printing',
      description: 'Premium materials with vibrant prints'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: '100% Satisfaction',
      description: 'Money back guarantee on all products'
    }
  ]

  const sampleProducts = [
    {
      _id: '1',
      name: 'Premium T-Shirt',
      description: '100% Cotton, comfortable fit',
      price: 599,
      type: 't-shirt',
      rating: 4.8,
      colors: ['#000000', '#FFFFFF', '#3B82F6', '#EF4444']
    },
    {
      _id: '2',
      name: 'Custom Mug',
      description: 'Ceramic mug with print',
      price: 299,
      type: 'mug',
      rating: 4.5,
      colors: ['#FFFFFF', '#000000', '#F59E0B']
    },
    {
      _id: '3',
      name: 'Photo Frame',
      description: 'Wooden photo frame',
      price: 399,
      type: 'frame',
      rating: 4.7,
      colors: ['#92400E', '#1F2937', '#374151']
    },
    {
      _id: '4',
      name: 'Hoodie',
      description: 'Warm and comfortable hoodie',
      price: 899,
      type: 'hoodie',
      rating: 4.9,
      colors: ['#000000', '#1E40AF', '#7C2D12', '#374151']
    }
  ]

  const processSteps = [
    {
      number: '01',
      title: 'Choose Product',
      description: 'Select from 50+ customizable products'
    },
    {
      number: '02',
      title: 'Design Online',
      description: 'Use our design tool or upload your design'
    },
    {
      number: '03',
      title: 'Preview & Order',
      description: 'See 3D preview and place your order'
    },
    {
      number: '04',
      title: 'Get Delivery',
      description: 'Fast delivery across India'
    }
  ]

  const companyStats = [
    { icon: <Package className="h-8 w-8 text-white/80" />, value: '50+', label: 'Product Categories' },
    { icon: <MapPin className="h-8 w-8 text-white/80" />, value: '100+', label: 'Cities Served' },
    { icon: <Headphones className="h-8 w-8 text-white/80" />, value: '24/7', label: 'Customer Support' },
    { icon: <Truck className="h-8 w-8 text-white/80" />, value: '99%', label: 'On-time Delivery' }
  ]

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-600"></div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
          <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent" />
          <div className="absolute left-1/4 top-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute right-1/4 bottom-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
        </div>
        
        <div className="relative container mx-auto px-4 pt-10 pb-24 md:pt-16 md:pb-32">
          <div className="max-w-3xl">

            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-up">
              Wear Your <span className="text-secondary-400 animate-pulse">Story</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Design custom T-shirts, mugs, and gifts with AI-powered tools. 
              Create unique products that tell your story.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                to="/designer"
                className="group inline-flex items-center gap-2 bg-white text-primary-700 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl"
              >
                <Palette className="h-5 w-5" />
                Start Designing
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/products"
                className="group inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <ShoppingBag className="h-5 w-5" />
                Browse Products
              </Link>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex -space-x-4">
                {[
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
                ].map((imgUrl, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-300 overflow-hidden">
                    <img src={imgUrl} alt="Creator" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300">Trusted by 10,000+ creators</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="relative container mx-auto px-4 pb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-1 animate-countup">{stat.value}</div>
                <div className="text-sm text-gray-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Categories
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Choose from our wide range of customizable products
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {designCategories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.name.toLowerCase()}`}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-white p-6 text-center border border-gray-100 hover:border-transparent transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600">{category.count}</p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose ViragKala?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Everything you need to create amazing custom products
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-50 text-primary-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Simple steps to create your custom products
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative text-center">
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-purple-600 text-white rounded-2xl text-2xl font-bold mb-6 mx-auto">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-3/4 w-full h-1 bg-gradient-to-r from-primary-500/50 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Featured Products
              </h2>
              <p className="text-gray-600">
                Best selling custom products
              </p>
            </div>
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors mt-4 md:mt-0"
            >
              View All Products
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {sampleProducts.map((product, index) => (
              <div
                key={product._id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative overflow-hidden aspect-square">
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="text-6xl">
                      {product.type === 't-shirt' && '👕'}
                      {product.type === 'mug' && '☕'}
                      {product.type === 'frame' && '🖼️'}
                      {product.type === 'hoodie' && '🧥'}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <Link
                      to={`/design/${product._id}`}
                      className="block w-full bg-white text-gray-900 py-3 rounded-full font-semibold text-center hover:bg-gray-100 transition-colors"
                    >
                      Customize Now
                    </Link>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                      {product.type}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    {product.colors.map((color, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full border border-gray-200"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">
                        ₹{product.price}
                      </span>
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ₹{product.price + 100}
                      </span>
                    </div>
                    
                    <Link
                      to={`/design/${product._id}`}
                      className="group inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 font-semibold text-sm"
                    >
                      Design
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Join thousands of satisfied creators
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-primary-200 transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 overflow-hidden">
                    <div className="w-full h-full bg-gray-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* Company Stats Banner */}
      <section className="py-16 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {companyStats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm md:text-base text-gray-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">No credit card required</span>
            </div>
            
            <h2 className="text-4xl font-bold mb-6">
              Ready to Create Something Amazing?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of creators who trust us for their custom products
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/register"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <Sparkles className="h-5 w-5" />
                Get Started Free
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/designer"
                className="group inline-flex items-center gap-2 border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-primary-50 transition-all duration-300 hover:scale-105"
              >
                <Palette className="h-5 w-5" />
                Try Design Studio
              </Link>
            </div>
            
            <p className="text-sm text-gray-500 mt-6">
              Free design tools • No minimum order • 24/7 support
            </p>
          </div>
        </div>
      </section>
      

      
    </div>
  )
}

export default Home