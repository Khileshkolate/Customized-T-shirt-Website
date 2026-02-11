// import { useState, useRef, useEffect } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import { 
//   Upload, 
//   Download, 
//   Palette,
//   Type,
//   Image as ImageIcon,
//   Brush,
//   Save,
//   X,
//   Undo,
//   Redo,
//   Move,
//   Grid,
//   Zap,
//   Layers,
//   Trash2,
//   RotateCw,
//   FlipHorizontal,
//   FlipVertical,
//   Maximize2,
//   Minus,
//   Plus,
//   Check,
//   ShoppingCart,
//   Package,
//   Truck,
//   Shield,
//   Star,
//   Heart
// } from 'lucide-react'
// import { fabric } from 'fabric'

// const DesignPage = () => {
//   const { id } = useParams()
//   const navigate = useNavigate()
//   const canvasRef = useRef(null)
//   const fileInputRef = useRef(null)
//   const [canvas, setCanvas] = useState(null)
//   const [activeTool, setActiveTool] = useState('select')
//   const [brushSize, setBrushSize] = useState(5)
//   const [brushColor, setBrushColor] = useState('#000000')
//   const [textValue, setTextValue] = useState('Your Text Here')
//   const [textColor, setTextColor] = useState('#000000')
//   const [textFont, setTextFont] = useState('Arial')
//   const [uploadedImages, setUploadedImages] = useState([])
//   const [selectedColor, setSelectedColor] = useState('#FFFFFF')
//   const [selectedSize, setSelectedSize] = useState('M')
//   const [selectedFabric, setSelectedFabric] = useState('Cotton')
//   const [quantity, setQuantity] = useState(1)
//   const [designLayers, setDesignLayers] = useState([])
//   const [history, setHistory] = useState([])
//   const [historyIndex, setHistoryIndex] = useState(-1)
//   const [scale, setScale] = useState(1)
//   const [isDrawingMode, setIsDrawingMode] = useState(false)

//   const product = {
//     _id: id,
//     name: 'Premium Cotton T-Shirt',
//     price: 599,
//     discountPrice: 499,
//     description: '100% premium cotton, comfortable fit for all-day wear'
//   }

//   const colors = [
//     { name: 'White', value: '#FFFFFF' },
//     { name: 'Black', value: '#000000' },
//     { name: 'Red', value: '#DC2626' },
//     { name: 'Blue', value: '#2563EB' },
//     { name: 'Green', value: '#16A34A' },
//     { name: 'Yellow', value: '#FBBF24' },
//     { name: 'Purple', value: '#9333EA' },
//     { name: 'Pink', value: '#EC4899' },
//     { name: 'Gray', value: '#6B7280' },
//     { name: 'Navy', value: '#1E3A8A' }
//   ]

//   const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

//   const fabrics = [
//     { name: 'Cotton', price: 0 },
//     { name: 'Premium Cotton', price: 100 },
//     { name: 'Organic Cotton', price: 150 },
//     { name: 'Poly-Cotton Blend', price: -50 },
//     { name: 'Jersey', price: 50 }
//   ]

//   const fonts = [
//     'Arial',
//     'Helvetica',
//     'Times New Roman',
//     'Courier New',
//     'Georgia',
//     'Verdana',
//     'Comic Sans MS',
//     'Impact',
//     'Tahoma',
//     'Trebuchet MS'
//   ]

//   const templates = [
//     { id: 1, name: 'Birthday', thumbnail: '🎂', color: '#F59E0B' },
//     { id: 2, name: 'Graduation', thumbnail: '🎓', color: '#8B5CF6' },
//     { id: 3, name: 'Anniversary', thumbnail: '❤️', color: '#EC4899' },
//     { id: 4, name: 'Sports', thumbnail: '⚽', color: '#10B981' },
//     { id: 5, name: 'Corporate', thumbnail: '💼', color: '#3B82F6' },
//     { id: 6, name: 'Funny', thumbnail: '😂', color: '#F59E0B' },
//     { id: 7, name: 'Music', thumbnail: '🎵', color: '#8B5CF6' },
//     { id: 8, name: 'Artistic', thumbnail: '🎨', color: '#EC4899' }
//   ]

//   // Initialize Fabric.js Canvas
//   useEffect(() => {
//     if (!canvasRef.current) return

//     const fabricCanvas = new fabric.Canvas(canvasRef.current, {
//       backgroundColor: '#f3f4f6',
//       selection: true,
//       selectionColor: 'rgba(59, 130, 246, 0.3)',
//       selectionLineWidth: 2
//     })

//     setCanvas(fabricCanvas)

//     // Add default text
//     const text = new fabric.Text('Your Design Here', {
//       left: 100,
//       top: 100,
//       fontSize: 30,
//       fill: '#000000',
//       fontFamily: 'Arial'
//     })
//     fabricCanvas.add(text)
//     updateLayers()
//     saveHistory()

//     fabricCanvas.on('object:modified', updateLayers)
//     fabricCanvas.on('object:added', updateLayers)
//     fabricCanvas.on('object:removed', updateLayers)

//     return () => {
//       fabricCanvas.dispose()
//     }
//   }, [])

//   const saveHistory = () => {
//     if (!canvas) return
//     const newHistory = history.slice(0, historyIndex + 1)
//     newHistory.push(JSON.stringify(canvas.toJSON()))
//     setHistory(newHistory)
//     setHistoryIndex(newHistory.length - 1)
//   }

//   const undo = () => {
//     if (historyIndex > 0) {
//       canvas.loadFromJSON(history[historyIndex - 1], () => {
//         canvas.renderAll()
//         setHistoryIndex(historyIndex - 1)
//         updateLayers()
//       })
//     }
//   }

//   const redo = () => {
//     if (historyIndex < history.length - 1) {
//       canvas.loadFromJSON(history[historyIndex + 1], () => {
//         canvas.renderAll()
//         setHistoryIndex(historyIndex + 1)
//         updateLayers()
//       })
//     }
//   }

//   const updateLayers = () => {
//     if (!canvas) return
//     const objects = canvas.getObjects()
//     const layers = objects.map((obj, index) => ({
//       id: index,
//       name: obj.type || 'Object',
//       type: obj.type,
//       selected: obj === canvas.getActiveObject()
//     }))
//     setDesignLayers(layers)
//   }

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0]
//     if (!file) return

//     const reader = new FileReader()
//     reader.onload = (event) => {
//       const imgUrl = event.target.result
//       fabric.Image.fromURL(imgUrl, (img) => {
//         img.scaleToWidth(200)
//         img.set({
//           left: 100,
//           top: 100,
//           selectable: true,
//           hasControls: true
//         })
//         canvas.add(img)
//         canvas.setActiveObject(img)
//         saveHistory()
//       })
      
//       setUploadedImages(prev => [...prev, {
//         id: Date.now(),
//         url: imgUrl,
//         name: file.name
//       }])
//     }
//     reader.readAsDataURL(file)
//   }

//   const addText = () => {
//     const text = new fabric.Text(textValue, {
//       left: 150,
//       top: 150,
//       fontSize: 30,
//       fill: textColor,
//       fontFamily: textFont,
//       selectable: true,
//       hasControls: true
//     })
//     canvas.add(text)
//     canvas.setActiveObject(text)
//     saveHistory()
//   }

//   const addTemplate = (template) => {
//     const text = new fabric.Text(template.thumbnail, {
//       left: 100,
//       top: 100,
//       fontSize: 60,
//       fill: template.color,
//       selectable: true,
//       hasControls: true
//     })
//     canvas.add(text)
//     canvas.setActiveObject(text)
//     saveHistory()
//   }

//   const toggleDrawingMode = () => {
//     if (!canvas) return
//     const newMode = !isDrawingMode
//     setIsDrawingMode(newMode)
//     canvas.isDrawingMode = newMode
    
//     if (newMode) {
//       canvas.freeDrawingBrush = new fabric.PencilBrush(canvas)
//       canvas.freeDrawingBrush.width = brushSize
//       canvas.freeDrawingBrush.color = brushColor
//     }
//     setActiveTool(newMode ? 'draw' : 'select')
//   }

//   const clearCanvas = () => {
//     if (!canvas) return
//     canvas.clear()
//     canvas.backgroundColor = '#f3f4f6'
//     saveHistory()
//   }

//   const deleteSelected = () => {
//     if (!canvas) return
//     const activeObject = canvas.getActiveObject()
//     if (activeObject) {
//       canvas.remove(activeObject)
//       saveHistory()
//     }
//   }

//   const bringToFront = () => {
//     if (!canvas) return
//     const activeObject = canvas.getActiveObject()
//     if (activeObject) {
//       activeObject.bringToFront()
//       canvas.renderAll()
//       saveHistory()
//     }
//   }

//   const sendToBack = () => {
//     if (!canvas) return
//     const activeObject = canvas.getActiveObject()
//     if (activeObject) {
//       activeObject.sendToBack()
//       canvas.renderAll()
//       saveHistory()
//     }
//   }

//   const flipHorizontal = () => {
//     if (!canvas) return
//     const activeObject = canvas.getActiveObject()
//     if (activeObject) {
//       activeObject.set('flipX', !activeObject.flipX)
//       canvas.renderAll()
//       saveHistory()
//     }
//   }

//   const flipVertical = () => {
//     if (!canvas) return
//     const activeObject = canvas.getActiveObject()
//     if (activeObject) {
//       activeObject.set('flipY', !activeObject.flipY)
//       canvas.renderAll()
//       saveHistory()
//     }
//   }

//   const exportDesign = () => {
//     if (!canvas) return
//     const dataURL = canvas.toDataURL({
//       format: 'png',
//       quality: 1
//     })
//     const link = document.createElement('a')
//     link.href = dataURL
//     link.download = 'my-design.png'
//     link.click()
//   }

//   const calculatePrice = () => {
//     const basePrice = product.discountPrice || product.price
//     const fabricPrice = fabrics.find(f => f.name === selectedFabric)?.price || 0
//     const quantityDiscount = quantity >= 10 ? 0.1 : quantity >= 5 ? 0.05 : 0
//     const total = (basePrice + fabricPrice) * quantity
//     return Math.round(total - (total * quantityDiscount))
//   }

//   const addToCart = () => {
//     const design = canvas.toDataURL()
//     const cartItem = {
//       productId: id,
//       design,
//       color: selectedColor,
//       size: selectedSize,
//       fabric: selectedFabric,
//       quantity,
//       price: calculatePrice()
//     }
//     localStorage.setItem('customDesign', JSON.stringify(cartItem))
//     navigate('/cart')
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Design Studio</h1>
//               <p className="text-gray-600">Create your custom design</p>
//             </div>
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={exportDesign}
//                 className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
//               >
//                 <Download className="h-4 w-4" />
//                 Export
//               </button>
//               <button
//                 onClick={addToCart}
//                 className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
//               >
//                 <ShoppingCart className="h-4 w-4" />
//                 Add to Cart - ₹{calculatePrice()}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Panel - Design Tools */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Canvas */}
//             <div className="bg-white rounded-2xl shadow-xl p-4 border border-gray-200">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-semibold text-gray-900">Design Canvas</h3>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => setScale(scale - 0.1)}
//                     disabled={scale <= 0.5}
//                     className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
//                   >
//                     <Minus className="h-4 w-4" />
//                   </button>
//                   <span className="text-sm font-medium">{Math.round(scale * 100)}%</span>
//                   <button
//                     onClick={() => setScale(scale + 0.1)}
//                     disabled={scale >= 2}
//                     className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
//                   >
//                     <Plus className="h-4 w-4" />
//                   </button>
//                   <button
//                     onClick={clearCanvas}
//                     className="p-2 hover:bg-gray-100 rounded-lg"
//                   >
//                     <Trash2 className="h-4 w-4 text-red-500" />
//                   </button>
//                 </div>
//               </div>
              
//               <div className="relative bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-300">
//                 {/* T-shirt Preview with Selected Color */}
//                 <div 
//                   className="absolute inset-0 pointer-events-none"
//                   style={{ backgroundColor: selectedColor, opacity: 0.1 }}
//                 />
                
//                 {/* T-shirt Outline */}
//                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                   <div 
//                     className="relative"
//                     style={{ 
//                       transform: `scale(${scale})`,
//                       transition: 'transform 0.3s ease'
//                     }}
//                   >
//                     {/* T-shirt SVG Outline */}
//                     <svg 
//                       width="400" 
//                       height="500" 
//                       viewBox="0 0 400 500"
//                       className="opacity-50"
//                     >
//                       <path
//                         d="M100,50 L300,50 L350,150 L300,250 L350,350 L300,450 L100,450 L50,350 L100,250 L50,150 L100,50 Z"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         className="text-gray-300"
//                       />
//                       <path
//                         d="M50,150 L30,120"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         className="text-gray-300"
//                       />
//                       <path
//                         d="M50,350 L30,380"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         className="text-gray-300"
//                       />
//                       <path
//                         d="M350,150 L370,120"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         className="text-gray-300"
//                       />
//                       <path
//                         d="M350,350 L370,380"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         className="text-gray-300"
//                       />
//                     </svg>
//                   </div>
//                 </div>
                
//                 <canvas
//                   ref={canvasRef}
//                   width={800}
//                   height={600}
//                   className="w-full h-[500px] cursor-crosshair"
//                   style={{ 
//                     transform: `scale(${scale})`,
//                     transformOrigin: 'center',
//                     transition: 'transform 0.3s ease'
//                   }}
//                 />
//               </div>
//             </div>

//             {/* Tools Section */}
//             <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Design Tools</h3>
              
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 {/* Tool Buttons */}
//                 <button
//                   onClick={() => setActiveTool('select')}
//                   className={`p-4 rounded-xl border-2 ${activeTool === 'select' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-primary-300'}`}
//                 >
//                   <Move className="h-6 w-6 mx-auto mb-2" />
//                   <span className="text-sm font-medium">Select</span>
//                 </button>

//                 <button
//                   onClick={toggleDrawingMode}
//                   className={`p-4 rounded-xl border-2 ${activeTool === 'draw' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-primary-300'}`}
//                 >
//                   <Brush className="h-6 w-6 mx-auto mb-2" />
//                   <span className="text-sm font-medium">Draw</span>
//                 </button>

//                 <button
//                   onClick={() => setActiveTool('text')}
//                   className={`p-4 rounded-xl border-2 ${activeTool === 'text' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-primary-300'}`}
//                 >
//                   <Type className="h-6 w-6 mx-auto mb-2" />
//                   <span className="text-sm font-medium">Text</span>
//                 </button>

//                 <button
//                   onClick={() => fileInputRef.current?.click()}
//                   className={`p-4 rounded-xl border-2 ${activeTool === 'image' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-primary-300'}`}
//                 >
//                   <ImageIcon className="h-6 w-6 mx-auto mb-2" />
//                   <span className="text-sm font-medium">Image</span>
//                 </button>
//               </div>

//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleImageUpload}
//                 accept="image/*"
//                 className="hidden"
//               />

//               {/* Active Tool Options */}
//               <div className="mt-6 pt-6 border-t border-gray-200">
//                 {activeTool === 'draw' && (
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Brush Size: {brushSize}px
//                       </label>
//                       <input
//                         type="range"
//                         min="1"
//                         max="50"
//                         value={brushSize}
//                         onChange={(e) => {
//                           setBrushSize(parseInt(e.target.value))
//                           if (canvas && canvas.freeDrawingBrush) {
//                             canvas.freeDrawingBrush.width = parseInt(e.target.value)
//                           }
//                         }}
//                         className="w-full"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Brush Color
//                       </label>
//                       <input
//                         type="color"
//                         value={brushColor}
//                         onChange={(e) => {
//                           setBrushColor(e.target.value)
//                           if (canvas && canvas.freeDrawingBrush) {
//                             canvas.freeDrawingBrush.color = e.target.value
//                           }
//                         }}
//                         className="w-full h-10 rounded-lg cursor-pointer"
//                       />
//                     </div>
//                   </div>
//                 )}

//                 {activeTool === 'text' && (
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Text
//                       </label>
//                       <input
//                         type="text"
//                         value={textValue}
//                         onChange={(e) => setTextValue(e.target.value)}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                       />
//                     </div>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Font
//                         </label>
//                         <select
//                           value={textFont}
//                           onChange={(e) => setTextFont(e.target.value)}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                         >
//                           {fonts.map(font => (
//                             <option key={font} value={font}>{font}</option>
//                           ))}
//                         </select>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Color
//                         </label>
//                         <input
//                           type="color"
//                           value={textColor}
//                           onChange={(e) => setTextColor(e.target.value)}
//                           className="w-full h-10 rounded-lg cursor-pointer"
//                         />
//                       </div>
//                     </div>
//                     <button
//                       onClick={addText}
//                       className="w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
//                     >
//                       Add Text to Canvas
//                     </button>
//                   </div>
//                 )}

//                 {activeTool === 'select' && (
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
//                     <button
//                       onClick={undo}
//                       disabled={historyIndex <= 0}
//                       className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-50"
//                     >
//                       <Undo className="h-4 w-4 mx-auto" />
//                     </button>
//                     <button
//                       onClick={redo}
//                       disabled={historyIndex >= history.length - 1}
//                       className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-50"
//                     >
//                       <Redo className="h-4 w-4 mx-auto" />
//                     </button>
//                     <button
//                       onClick={flipHorizontal}
//                       className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg"
//                     >
//                       <FlipHorizontal className="h-4 w-4 mx-auto" />
//                     </button>
//                     <button
//                       onClick={flipVertical}
//                       className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg"
//                     >
//                       <FlipVertical className="h-4 w-4 mx-auto" />
//                     </button>
//                     <button
//                       onClick={bringToFront}
//                       className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg"
//                     >
//                       <Layers className="h-4 w-4 mx-auto" />
//                     </button>
//                     <button
//                       onClick={sendToBack}
//                       className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg"
//                     >
//                       <Layers className="h-4 w-4 mx-auto transform rotate-180" />
//                     </button>
//                     <button
//                       onClick={deleteSelected}
//                       className="p-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg"
//                     >
//                       <Trash2 className="h-4 w-4 mx-auto" />
//                     </button>
//                     <button
//                       onClick={() => canvas?.discardActiveObject()}
//                       className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg"
//                     >
//                       <X className="h-4 w-4 mx-auto" />
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Right Panel - Preview & Options */}
//           <div className="space-y-8">
//             {/* Product Preview */}
//             <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Preview</h3>
              
//               <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square mb-4">
//                 {/* T-shirt with selected color */}
//                 <div 
//                   className="absolute inset-0"
//                   style={{ backgroundColor: selectedColor }}
//                 />
                
//                 {/* T-shirt pattern */}
//                 <div className="absolute inset-0 opacity-5">
//                   <div className="absolute inset-0" style={{
//                     backgroundImage: `radial-gradient(circle at 25% 25%, rgba(0,0,0,0.1) 2px, transparent 2px)`,
//                     backgroundSize: '20px 20px'
//                   }} />
//                 </div>
                
//                 {/* Mock design overlay */}
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="text-4xl">🎨</div>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <h4 className="font-bold text-xl">{product.name}</h4>
//                 <div className="flex items-center gap-2">
//                   <span className="text-2xl font-bold">₹{product.discountPrice}</span>
//                   <span className="text-lg text-gray-400 line-through">₹{product.price}</span>
//                   <span className="text-sm font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">
//                     Save ₹{product.price - product.discountPrice}
//                   </span>
//                 </div>
//                 <p className="text-gray-600">{product.description}</p>
//               </div>
//             </div>

//             {/* Customization Options */}
//             <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 space-y-6">
//               <h3 className="text-lg font-semibold text-gray-900">Customization Options</h3>

//               {/* Color Selection */}
//               <div>
//                 <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
//                   <Palette className="h-4 w-4" />
//                   Select Color
//                 </h4>
//                 <div className="grid grid-cols-5 gap-2">
//                   {colors.map(color => (
//                     <button
//                       key={color.value}
//                       onClick={() => setSelectedColor(color.value)}
//                       className={`aspect-square rounded-lg border-2 ${selectedColor === color.value ? 'border-primary-500 ring-2 ring-primary-200' : 'border-gray-300 hover:border-primary-300'}`}
//                       style={{ backgroundColor: color.value }}
//                       title={color.name}
//                     >
//                       {selectedColor === color.value && (
//                         <Check className="h-5 w-5 text-white mx-auto" />
//                       )}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Size Selection */}
//               <div>
//                 <h4 className="font-medium text-gray-700 mb-3">Select Size</h4>
//                 <div className="grid grid-cols-4 gap-2">
//                   {sizes.map(size => (
//                     <button
//                       key={size}
//                       onClick={() => setSelectedSize(size)}
//                       className={`py-2 rounded-lg border ${selectedSize === size ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-300 hover:border-primary-300'}`}
//                     >
//                       {size}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Fabric Selection */}
//               <div>
//                 <h4 className="font-medium text-gray-700 mb-3">Select Fabric</h4>
//                 <div className="space-y-2">
//                   {fabrics.map(fabric => (
//                     <button
//                       key={fabric.name}
//                       onClick={() => setSelectedFabric(fabric.name)}
//                       className={`w-full flex items-center justify-between p-3 rounded-lg border ${selectedFabric === fabric.name ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-primary-300'}`}
//                     >
//                       <span>{fabric.name}</span>
//                       <span className={`text-sm ${fabric.price > 0 ? 'text-green-600' : fabric.price < 0 ? 'text-red-600' : 'text-gray-500'}`}>
//                         {fabric.price > 0 ? `+₹${fabric.price}` : fabric.price < 0 ? `-₹${Math.abs(fabric.price)}` : 'Standard'}
//                       </span>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Quantity */}
//               <div>
//                 <h4 className="font-medium text-gray-700 mb-3">Quantity</h4>
//                 <div className="flex items-center gap-4">
//                   <button
//                     onClick={() => setQuantity(q => Math.max(1, q - 1))}
//                     className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
//                   >
//                     <Minus className="h-4 w-4" />
//                   </button>
//                   <span className="text-2xl font-bold min-w-[40px] text-center">{quantity}</span>
//                   <button
//                     onClick={() => setQuantity(q => q + 1)}
//                     className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
//                   >
//                     <Plus className="h-4 w-4" />
//                   </button>
//                   <div className="ml-auto text-sm text-gray-600">
//                     {quantity >= 10 && (
//                       <span className="text-green-600 font-bold">10% discount applied!</span>
//                     )}
//                     {quantity >= 5 && quantity < 10 && (
//                       <span className="text-green-600 font-bold">5% discount applied!</span>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Price Summary */}
//               <div className="pt-6 border-t border-gray-200">
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Base Price</span>
//                     <span>₹{product.discountPrice}</span>
//                   </div>
//                   {fabrics.find(f => f.name === selectedFabric)?.price !== 0 && (
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">{selectedFabric} Fabric</span>
//                       <span className={fabrics.find(f => f.name === selectedFabric)?.price > 0 ? 'text-green-600' : 'text-red-600'}>
//                         {fabrics.find(f => f.name === selectedFabric)?.price > 0 ? '+' : ''}
//                         ₹{fabrics.find(f => f.name === selectedFabric)?.price}
//                       </span>
//                     </div>
//                   )}
//                   {quantity >= 5 && (
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Quantity Discount</span>
//                       <span className="text-green-600">
//                         -{quantity >= 10 ? '10' : '5'}%
//                       </span>
//                     </div>
//                   )}
//                   <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
//                     <span>Total</span>
//                     <span>₹{calculatePrice()}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Templates */}
//             <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Templates</h3>
//               <div className="grid grid-cols-4 gap-2">
//                 {templates.map(template => (
//                   <button
//                     key={template.id}
//                     onClick={() => addTemplate(template)}
//                     className="aspect-square rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all flex flex-col items-center justify-center p-2"
//                     title={template.name}
//                   >
//                     <span className="text-2xl mb-1">{template.thumbnail}</span>
//                     <span className="text-xs text-gray-600">{template.name}</span>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Uploaded Images */}
//             {uploadedImages.length > 0 && (
//               <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Images</h3>
//                 <div className="grid grid-cols-3 gap-2">
//                   {uploadedImages.map(image => (
//                     <div key={image.id} className="relative group">
//                       <img
//                         src={image.url}
//                         alt={image.name}
//                         className="w-full h-24 object-cover rounded-lg"
//                       />
//                       <button
//                         onClick={() => {
//                           fabric.Image.fromURL(image.url, (img) => {
//                             img.scaleToWidth(200)
//                             img.set({ left: 100, top: 100 })
//                             canvas.add(img)
//                             saveHistory()
//                           })
//                         }}
//                         className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100"
//                       >
//                         <span className="text-white text-xs bg-black/70 px-2 py-1 rounded">
//                           Add
//                         </span>
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default DesignPage















import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  Upload, 
  Download, 
  Palette,
  Type,
  Image as ImageIcon,
  Brush,
  Save,
  X,
  Undo,
  Redo,
  Move,
  Grid,
  Zap,
  Layers,
  Trash2,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
  Maximize2,
  Minus,
  Plus,
  Check,
  ShoppingCart,
  Package,
  Truck,
  Shield,
  Star,
  Heart,
  User,
  Ruler,
  Scissors,
  Droplets,
  Shirt,
  Users,
  Target
} from 'lucide-react'
import { fabric } from 'fabric'

const DesignPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)
  const [canvas, setCanvas] = useState(null)
  const [activeTool, setActiveTool] = useState('select')
  const [brushSize, setBrushSize] = useState(5)
  const [brushColor, setBrushColor] = useState('#000000')
  const [textValue, setTextValue] = useState('Your Text Here')
  const [textColor, setTextColor] = useState('#000000')
  const [textFont, setTextFont] = useState('Arial')
  const [uploadedImages, setUploadedImages] = useState([])
  const [selectedColor, setSelectedColor] = useState('#FFFFFF')
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedFabric, setSelectedFabric] = useState('Cotton')
  const [quantity, setQuantity] = useState(1)
  const [designLayers, setDesignLayers] = useState([])
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [scale, setScale] = useState(1)
  const [isDrawingMode, setIsDrawingMode] = useState(false)
  const [modelView, setModelView] = useState('front') // 'front', 'back', 'flat'
  const [userMeasurements, setUserMeasurements] = useState({
    chest: 40,
    waist: 34,
    height: 175,
    weight: 70
  })

  const product = {
    _id: id,
    name: 'Premium Cotton T-Shirt',
    price: 599,
    discountPrice: 499,
    description: '100% premium cotton, comfortable fit for all-day wear'
  }

  const colors = [
    { name: 'Pure White', value: '#FFFFFF', rgb: 'rgb(255, 255, 255)' },
    { name: 'Jet Black', value: '#000000', rgb: 'rgb(0, 0, 0)' },
    { name: 'Classic Red', value: '#DC2626', rgb: 'rgb(220, 38, 38)' },
    { name: 'Royal Blue', value: '#2563EB', rgb: 'rgb(37, 99, 235)' },
    { name: 'Forest Green', value: '#16A34A', rgb: 'rgb(22, 163, 74)' },
    { name: 'Sunshine Yellow', value: '#FBBF24', rgb: 'rgb(251, 191, 36)' },
    { name: 'Violet Purple', value: '#9333EA', rgb: 'rgb(147, 51, 234)' },
    { name: 'Hot Pink', value: '#EC4899', rgb: 'rgb(236, 72, 153)' },
    { name: 'Charcoal Gray', value: '#6B7280', rgb: 'rgb(107, 114, 128)' },
    { name: 'Navy Blue', value: '#1E3A8A', rgb: 'rgb(30, 58, 138)' },
    { name: 'Cream', value: '#FEF3C7', rgb: 'rgb(254, 243, 199)' },
    { name: 'Maroon', value: '#991B1B', rgb: 'rgb(153, 27, 27)' }
  ]

  const sizes = [
    { label: 'XS', chest: 34, length: 26, shoulder: 16 },
    { label: 'S', chest: 36, length: 27, shoulder: 17 },
    { label: 'M', chest: 38, length: 28, shoulder: 18 },
    { label: 'L', chest: 40, length: 29, shoulder: 19 },
    { label: 'XL', chest: 42, length: 30, shoulder: 20 },
    { label: 'XXL', chest: 44, length: 31, shoulder: 21 },
    { label: 'XXXL', chest: 46, length: 32, shoulder: 22 }
  ]

  const fabrics = [
    { name: 'Basic Cotton', price: 0, description: '100% cotton, breathable', weight: '180 GSM' },
    { name: 'Premium Cotton', price: 100, description: 'Premium combed cotton', weight: '220 GSM' },
    { name: 'Organic Cotton', price: 150, description: 'GOTS certified organic', weight: '200 GSM' },
    { name: 'Poly-Cotton Blend', price: -50, description: '65% cotton, 35% polyester', weight: '160 GSM' },
    { name: 'Jersey Knit', price: 50, description: 'Soft stretchable jersey', weight: '190 GSM' },
    { name: 'Performance Fabric', price: 200, description: 'Moisture-wicking, quick dry', weight: '170 GSM' }
  ]

  const fonts = [
    'Arial',
    'Helvetica',
    'Times New Roman',
    'Courier New',
    'Georgia',
    'Verdana',
    'Comic Sans MS',
    'Impact',
    'Tahoma',
    'Trebuchet MS',
    'Brush Script MT',
    'Courier',
    'Garamond',
    'Palatino'
  ]

  const templates = [
    { id: 1, name: 'Birthday', thumbnail: '🎂', color: '#F59E0B', category: 'celebration' },
    { id: 2, name: 'Graduation', thumbnail: '🎓', color: '#8B5CF6', category: 'academic' },
    { id: 3, name: 'Anniversary', thumbnail: '❤️', color: '#EC4899', category: 'celebration' },
    { id: 4, name: 'Sports', thumbnail: '⚽', color: '#10B981', category: 'sports' },
    { id: 5, name: 'Corporate', thumbnail: '💼', color: '#3B82F6', category: 'business' },
    { id: 6, name: 'Funny Quote', thumbnail: '😂', color: '#F59E0B', category: 'humor' },
    { id: 7, name: 'Music Band', thumbnail: '🎵', color: '#8B5CF6', category: 'music' },
    { id: 8, name: 'Artistic', thumbnail: '🎨', color: '#EC4899', category: 'art' }
  ]

  // Initialize Fabric.js Canvas
  useEffect(() => {
    if (!canvasRef.current) return

    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      backgroundColor: 'transparent',
      selection: true,
      selectionColor: 'rgba(59, 130, 246, 0.3)',
      selectionLineWidth: 2,
      preserveObjectStacking: true
    })

    setCanvas(fabricCanvas)

    // Add default welcome text
    const text = new fabric.Text('Your Design Here', {
      left: 150,
      top: 150,
      fontSize: 30,
      fill: '#000000',
      fontFamily: 'Arial',
      fontWeight: 'bold',
      shadow: new fabric.Shadow({
        color: 'rgba(0,0,0,0.3)',
        blur: 3,
        offsetX: 2,
        offsetY: 2
      })
    })
    fabricCanvas.add(text)
    updateLayers()
    saveHistory()

    fabricCanvas.on('object:modified', updateLayers)
    fabricCanvas.on('object:added', updateLayers)
    fabricCanvas.on('object:removed', updateLayers)

    return () => {
      fabricCanvas.dispose()
    }
  }, [])

  const saveHistory = () => {
    if (!canvas) return
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(JSON.stringify(canvas.toJSON()))
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const undo = () => {
    if (historyIndex > 0) {
      canvas.loadFromJSON(history[historyIndex - 1], () => {
        canvas.renderAll()
        setHistoryIndex(historyIndex - 1)
        updateLayers()
      })
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      canvas.loadFromJSON(history[historyIndex + 1], () => {
        canvas.renderAll()
        setHistoryIndex(historyIndex + 1)
        updateLayers()
      })
    }
  }

  const updateLayers = () => {
    if (!canvas) return
    const objects = canvas.getObjects()
    const layers = objects.map((obj, index) => ({
      id: index,
      name: obj.type === 'text' ? obj.text : obj.type || 'Object',
      type: obj.type,
      selected: obj === canvas.getActiveObject()
    }))
    setDesignLayers(layers)
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const imgUrl = event.target.result
      fabric.Image.fromURL(imgUrl, (img) => {
        img.scaleToWidth(200)
        img.set({
          left: 150,
          top: 150,
          selectable: true,
          hasControls: true,
          hasBorders: true,
          cornerStyle: 'circle',
          cornerColor: '#3B82F6',
          cornerSize: 12,
          transparentCorners: false
        })
        canvas.add(img)
        canvas.setActiveObject(img)
        saveHistory()
      })
      
      setUploadedImages(prev => [...prev, {
        id: Date.now(),
        url: imgUrl,
        name: file.name
      }])
    }
    reader.readAsDataURL(file)
  }

  const addText = () => {
    const text = new fabric.Text(textValue, {
      left: 200,
      top: 200,
      fontSize: 36,
      fill: textColor,
      fontFamily: textFont,
      fontWeight: 'bold',
      selectable: true,
      hasControls: true,
      hasBorders: true,
      cornerStyle: 'circle',
      cornerColor: '#3B82F6',
      cornerSize: 12,
      transparentCorners: false,
      shadow: new fabric.Shadow({
        color: 'rgba(0,0,0,0.3)',
        blur: 3,
        offsetX: 2,
        offsetY: 2
      })
    })
    canvas.add(text)
    canvas.setActiveObject(text)
    saveHistory()
  }

  const addTemplate = (template) => {
    const text = new fabric.Text(template.thumbnail, {
      left: 200,
      top: 200,
      fontSize: 80,
      fill: template.color,
      selectable: true,
      hasControls: true,
      hasBorders: true,
      cornerStyle: 'circle',
      cornerColor: '#3B82F6',
      cornerSize: 12,
      transparentCorners: false,
      shadow: new fabric.Shadow({
        color: 'rgba(0,0,0,0.3)',
        blur: 5,
        offsetX: 3,
        offsetY: 3
      })
    })
    canvas.add(text)
    canvas.setActiveObject(text)
    saveHistory()
  }

  const toggleDrawingMode = () => {
    if (!canvas) return
    const newMode = !isDrawingMode
    setIsDrawingMode(newMode)
    canvas.isDrawingMode = newMode
    
    if (newMode) {
      canvas.freeDrawingBrush = new fabric.PencilBrush(canvas)
      canvas.freeDrawingBrush.width = brushSize
      canvas.freeDrawingBrush.color = brushColor
    }
    setActiveTool(newMode ? 'draw' : 'select')
  }

  const clearCanvas = () => {
    if (!canvas) return
    if (window.confirm('Are you sure you want to clear the entire canvas?')) {
      canvas.clear()
      saveHistory()
    }
  }

  const deleteSelected = () => {
    if (!canvas) return
    const activeObject = canvas.getActiveObject()
    if (activeObject) {
      canvas.remove(activeObject)
      saveHistory()
    }
  }

  const bringToFront = () => {
    if (!canvas) return
    const activeObject = canvas.getActiveObject()
    if (activeObject) {
      activeObject.bringToFront()
      canvas.renderAll()
      saveHistory()
    }
  }

  const sendToBack = () => {
    if (!canvas) return
    const activeObject = canvas.getActiveObject()
    if (activeObject) {
      activeObject.sendToBack()
      canvas.renderAll()
      saveHistory()
    }
  }

  const flipHorizontal = () => {
    if (!canvas) return
    const activeObject = canvas.getActiveObject()
    if (activeObject) {
      activeObject.set('flipX', !activeObject.flipX)
      canvas.renderAll()
      saveHistory()
    }
  }

  const flipVertical = () => {
    if (!canvas) return
    const activeObject = canvas.getActiveObject()
    if (activeObject) {
      activeObject.set('flipY', !activeObject.flipY)
      canvas.renderAll()
      saveHistory()
    }
  }

  const exportDesign = () => {
    if (!canvas) return
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 2
    })
    const link = document.createElement('a')
    link.href = dataURL
    link.download = `custom-design-${Date.now()}.png`
    link.click()
  }

  const calculatePrice = () => {
    const basePrice = product.discountPrice || product.price
    const fabricPrice = fabrics.find(f => f.name === selectedFabric)?.price || 0
    const quantityDiscount = quantity >= 10 ? 0.15 : quantity >= 5 ? 0.1 : quantity >= 3 ? 0.05 : 0
    const sizeMultiplier = sizes.find(s => s.label === selectedSize)?.chest > 40 ? 1.1 : 1
    const total = (basePrice + fabricPrice) * quantity * sizeMultiplier
    return Math.round(total - (total * quantityDiscount))
  }

  const addToCart = () => {
    const design = canvas.toDataURL()
    const cartItem = {
      productId: id,
      design,
      color: selectedColor,
      colorName: colors.find(c => c.value === selectedColor)?.name,
      size: selectedSize,
      fabric: selectedFabric,
      quantity,
      price: calculatePrice(),
      designData: canvas.toJSON()
    }
    localStorage.setItem('customDesign', JSON.stringify(cartItem))
    navigate('/cart')
  }

  // Get current size measurements
  const currentSize = sizes.find(s => s.label === selectedSize) || sizes[2]
  const currentFabric = fabrics.find(f => f.name === selectedFabric) || fabrics[0]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Design Studio</h1>
              <p className="text-gray-600">Create your custom {product.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={exportDesign}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
              >
                <Download className="h-4 w-4" />
                Export Design
              </button>
              <button
                onClick={addToCart}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-lg font-semibold hover:from-primary-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart - ₹{calculatePrice()}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Design Tools */}
          <div className="lg:col-span-2 space-y-8">
            {/* Canvas with Model View */}
            <div className="bg-white rounded-2xl shadow-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-semibold text-gray-900">Design Canvas</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setModelView('front')}
                      className={`px-3 py-1 rounded-full text-sm ${modelView === 'front' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-700'}`}
                    >
                      Front View
                    </button>
                    <button
                      onClick={() => setModelView('back')}
                      className={`px-3 py-1 rounded-full text-sm ${modelView === 'back' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-700'}`}
                    >
                      Back View
                    </button>
                    <button
                      onClick={() => setModelView('flat')}
                      className={`px-3 py-1 rounded-full text-sm ${modelView === 'flat' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-700'}`}
                    >
                      Flat View
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setScale(Math.max(0.5, scale - 0.1))}
                    disabled={scale <= 0.5}
                    className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-sm font-medium min-w-[60px] text-center">{Math.round(scale * 100)}%</span>
                  <button
                    onClick={() => setScale(Math.min(2, scale + 0.1))}
                    disabled={scale >= 2}
                    className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden border-2 border-gray-300 min-h-[500px] flex items-center justify-center">
                {/* Model with T-shirt */}
                <div className="relative" style={{ transform: `scale(${scale})`, transition: 'transform 0.3s ease' }}>
                  {/* Model Body */}
                  <div className="relative">
                    {/* Model Outline (Always visible) */}
                    <svg width="400" height="500" viewBox="0 0 400 500" className="absolute inset-0 z-0">
                      {/* Head */}
                      <circle cx="200" cy="120" r="40" fill="#FED7AA" />
                      {/* Body */}
                      <rect x="160" y="160" width="80" height="160" rx="20" fill="#FED7AA" />
                      {/* Arms */}
                      <rect x="120" y="160" width="40" height="120" rx="20" fill="#FED7AA" />
                      <rect x="240" y="160" width="40" height="120" rx="20" fill="#FED7AA" />
                      {/* Legs */}
                      <rect x="170" y="320" width="30" height="120" rx="15" fill="#1E40AF" />
                      <rect x="200" y="320" width="30" height="120" rx="15" fill="#1E40AF" />
                    </svg>

                    {/* T-shirt on Model */}
                    <svg width="400" height="500" viewBox="0 0 400 500" className="absolute inset-0 z-10">
                      {/* T-shirt Front */}
                      {modelView === 'front' && (
                        <g>
                          {/* Main T-shirt body with selected color */}
                          <path
                            d="M160,160 L240,160 L260,200 L240,240 L160,240 L140,200 L160,160 Z"
                            fill={selectedColor}
                            stroke="#1F2937"
                            strokeWidth="2"
                            opacity="0.9"
                          />
                          {/* Sleeves */}
                          <path
                            d="M120,160 L160,160 L140,200 L120,200 Z"
                            fill={selectedColor}
                            stroke="#1F2937"
                            strokeWidth="2"
                            opacity="0.9"
                          />
                          <path
                            d="M240,160 L280,160 L280,200 L260,200 Z"
                            fill={selectedColor}
                            stroke="#1F2937"
                            strokeWidth="2"
                            opacity="0.9"
                          />
                          {/* Neck */}
                          <circle cx="200" cy="160" r="20" fill={selectedColor} stroke="#1F2937" strokeWidth="2" />
                        </g>
                      )}

                      {/* T-shirt Back */}
                      {modelView === 'back' && (
                        <g>
                          <path
                            d="M160,160 L240,160 L260,200 L240,240 L160,240 L140,200 L160,160 Z"
                            fill={selectedColor}
                            stroke="#1F2937"
                            strokeWidth="2"
                            opacity="0.9"
                          />
                          {/* Back neck */}
                          <path
                            d="M180,140 L220,140 L220,160 L180,160 Z"
                            fill={selectedColor}
                            stroke="#1F2937"
                            strokeWidth="2"
                            opacity="0.9"
                          />
                        </g>
                      )}

                      {/* Flat T-shirt View */}
                      {modelView === 'flat' && (
                        <g transform="translate(100, 100)">
                          {/* Main body */}
                          <rect x="50" y="0" width="200" height="240" rx="10" fill={selectedColor} stroke="#1F2937" strokeWidth="2" />
                          {/* Sleeves */}
                          <rect x="0" y="50" width="50" height="140" rx="10" fill={selectedColor} stroke="#1F2937" strokeWidth="2" />
                          <rect x="250" y="50" width="50" height="140" rx="10" fill={selectedColor} stroke="#1F2937" strokeWidth="2" />
                          {/* Neck */}
                          <rect x="120" y="-20" width="60" height="40" rx="5" fill={selectedColor} stroke="#1F2937" strokeWidth="2" />
                        </g>
                      )}
                    </svg>

                    {/* Size indicators */}
                    <div className="absolute" style={{
                      top: `${160 - (currentSize.chest - 38) * 2}px`,
                      left: `${200 - currentSize.chest * 2}px`,
                      width: `${currentSize.chest * 4}px`,
                      height: `${currentSize.length * 4}px`,
                      border: '2px dashed rgba(59, 130, 246, 0.5)',
                      pointerEvents: 'none'
                    }}>
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-primary-600 bg-white px-2 py-1 rounded shadow">
                        Chest: {currentSize.chest}"
                      </div>
                      <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs font-medium text-primary-600 bg-white px-2 py-1 rounded shadow">
                        Length: {currentSize.length}"
                      </div>
                    </div>
                  </div>
                </div>

                {/* Canvas for Design Elements */}
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={600}
                  className="absolute top-0 left-0 w-full h-full z-20 cursor-crosshair"
                  style={{ 
                    transform: `scale(${scale})`,
                    transformOrigin: 'center',
                    transition: 'transform 0.3s ease'
                  }}
                />
              </div>
            </div>

            {/* Tools Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Design Tools</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <button
                  onClick={() => setActiveTool('select')}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center ${activeTool === 'select' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-primary-300'}`}
                >
                  <Move className="h-6 w-6 mb-2" />
                  <span className="text-sm font-medium">Select</span>
                </button>

                <button
                  onClick={toggleDrawingMode}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center ${activeTool === 'draw' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-primary-300'}`}
                >
                  <Brush className="h-6 w-6 mb-2" />
                  <span className="text-sm font-medium">Draw</span>
                </button>

                <button
                  onClick={() => setActiveTool('text')}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center ${activeTool === 'text' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-primary-300'}`}
                >
                  <Type className="h-6 w-6 mb-2" />
                  <span className="text-sm font-medium">Text</span>
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center ${activeTool === 'image' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-primary-300'}`}
                >
                  <ImageIcon className="h-6 w-6 mb-2" />
                  <span className="text-sm font-medium">Image</span>
                </button>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />

              {/* Active Tool Options */}
              <div className="pt-6 border-t border-gray-200">
                {activeTool === 'draw' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Brush Size: {brushSize}px
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="50"
                        value={brushSize}
                        onChange={(e) => {
                          setBrushSize(parseInt(e.target.value))
                          if (canvas && canvas.freeDrawingBrush) {
                            canvas.freeDrawingBrush.width = parseInt(e.target.value)
                          }
                        }}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Brush Color
                      </label>
                      <input
                        type="color"
                        value={brushColor}
                        onChange={(e) => {
                          setBrushColor(e.target.value)
                          if (canvas && canvas.freeDrawingBrush) {
                            canvas.freeDrawingBrush.color = e.target.value
                          }
                        }}
                        className="w-full h-10 rounded-lg cursor-pointer border border-gray-300"
                      />
                    </div>
                  </div>
                )}

                {activeTool === 'text' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Text Content
                      </label>
                      <input
                        type="text"
                        value={textValue}
                        onChange={(e) => setTextValue(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                        placeholder="Enter your text here"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Font
                        </label>
                        <select
                          value={textFont}
                          onChange={(e) => setTextFont(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                        >
                          {fonts.map(font => (
                            <option key={font} value={font}>{font}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Text Color
                        </label>
                        <input
                          type="color"
                          value={textColor}
                          onChange={(e) => setTextColor(e.target.value)}
                          className="w-full h-10 rounded-lg cursor-pointer border border-gray-300"
                        />
                      </div>
                    </div>
                    <button
                      onClick={addText}
                      className="w-full py-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-lg font-semibold hover:from-primary-700 hover:to-purple-700 transition-all"
                    >
                      Add Text to Design
                    </button>
                  </div>
                )}

                {activeTool === 'select' && (
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      onClick={undo}
                      disabled={historyIndex <= 0}
                      className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-50 flex flex-col items-center"
                      title="Undo"
                    >
                      <Undo className="h-4 w-4 mb-1" />
                      <span className="text-xs">Undo</span>
                    </button>
                    <button
                      onClick={redo}
                      disabled={historyIndex >= history.length - 1}
                      className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-50 flex flex-col items-center"
                      title="Redo"
                    >
                      <Redo className="h-4 w-4 mb-1" />
                      <span className="text-xs">Redo</span>
                    </button>
                    <button
                      onClick={flipHorizontal}
                      className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg flex flex-col items-center"
                      title="Flip Horizontal"
                    >
                      <FlipHorizontal className="h-4 w-4 mb-1" />
                      <span className="text-xs">Flip H</span>
                    </button>
                    <button
                      onClick={flipVertical}
                      className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg flex flex-col items-center"
                      title="Flip Vertical"
                    >
                      <FlipVertical className="h-4 w-4 mb-1" />
                      <span className="text-xs">Flip V</span>
                    </button>
                    <button
                      onClick={bringToFront}
                      className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg flex flex-col items-center"
                      title="Bring to Front"
                    >
                      <Layers className="h-4 w-4 mb-1" />
                      <span className="text-xs">Front</span>
                    </button>
                    <button
                      onClick={sendToBack}
                      className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg flex flex-col items-center"
                      title="Send to Back"
                    >
                      <Layers className="h-4 w-4 mb-1 transform rotate-180" />
                      <span className="text-xs">Back</span>
                    </button>
                    <button
                      onClick={deleteSelected}
                      className="p-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg flex flex-col items-center"
                      title="Delete Selected"
                    >
                      <Trash2 className="h-4 w-4 mb-1" />
                      <span className="text-xs">Delete</span>
                    </button>
                    <button
                      onClick={clearCanvas}
                      className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg flex flex-col items-center"
                      title="Clear Canvas"
                    >
                      <X className="h-4 w-4 mb-1" />
                      <span className="text-xs">Clear</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - Preview & Options */}
          <div className="space-y-8">
            {/* Product Preview */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Preview</h3>
              
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden aspect-square mb-4">
                {/* 3D T-shirt Preview */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* T-shirt with selected color */}
                    <div className="relative">
                      {/* T-shirt shadow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 transform translate-x-4 translate-y-4 rounded-xl"></div>
                      
                      {/* Main T-shirt */}
                      <div 
                        className="relative rounded-xl shadow-lg transform rotate-3"
                        style={{ 
                          backgroundColor: selectedColor,
                          width: `${currentSize.chest * 8}px`,
                          height: `${currentSize.length * 8}px`,
                          transform: 'rotate3d(1, 1, 0, 20deg)'
                        }}
                      >
                        {/* Texture overlay */}
                        <div className="absolute inset-0 opacity-10" style={{
                          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(0,0,0,0.2) 2px, transparent 2px)`,
                          backgroundSize: '20px 20px'
                        }} />
                        
                        {/* Design preview */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-4xl opacity-80">🎨</div>
                        </div>
                        
                        {/* Size label */}
                        <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold">
                          Size: {selectedSize}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-xl">{product.name}</h4>
                    <p className="text-gray-600 text-sm mt-1">{currentFabric.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">₹{calculatePrice()}</span>
                      <span className="text-lg text-gray-400 line-through">₹{product.price * quantity}</span>
                    </div>
                    <div className="text-sm text-green-600 font-medium">
                      You save ₹{product.price * quantity - calculatePrice()}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Shirt className="h-4 w-4 text-gray-500" />
                    <span>Fabric: {currentFabric.weight}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-gray-500" />
                    <span>Chest: {currentSize.chest}"</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Customization Options */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Customization
              </h3>

              {/* Color Selection */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3">T-Shirt Color</h4>
                <div className="grid grid-cols-4 gap-2">
                  {colors.map(color => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color.value)}
                      className={`aspect-square rounded-lg border-2 ${selectedColor === color.value ? 'border-primary-500 ring-4 ring-primary-200' : 'border-gray-300 hover:border-primary-300'} relative group`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    >
                      {selectedColor === color.value && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Check className="h-5 w-5 text-white drop-shadow-lg" />
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {color.name}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="mt-2 text-sm text-gray-600 flex items-center gap-2">
                  <Droplets className="h-4 w-4" />
                  Selected: <span className="font-medium">{colors.find(c => c.value === selectedColor)?.name}</span>
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Ruler className="h-4 w-4" />
                  Select Size
                </h4>
                <div className="grid grid-cols-4 gap-2">
                  {sizes.map(size => (
                    <button
                      key={size.label}
                      onClick={() => setSelectedSize(size.label)}
                      className={`py-3 rounded-lg border flex flex-col items-center ${selectedSize === size.label ? 'border-primary-500 bg-primary-50 text-primary-700 ring-2 ring-primary-200' : 'border-gray-300 hover:border-primary-300'}`}
                    >
                      <span className="font-bold">{size.label}</span>
                      <span className="text-xs text-gray-500 mt-1">{size.chest}" chest</span>
                    </button>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Size Guide</span>
                    <span className="text-xs text-primary-600">{currentSize.label} Selected</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center p-2 bg-white rounded">
                      <div className="font-bold">{currentSize.chest}"</div>
                      <div className="text-gray-500">Chest</div>
                    </div>
                    <div className="text-center p-2 bg-white rounded">
                      <div className="font-bold">{currentSize.length}"</div>
                      <div className="text-gray-500">Length</div>
                    </div>
                    <div className="text-center p-2 bg-white rounded">
                      <div className="font-bold">{currentSize.shoulder}"</div>
                      <div className="text-gray-500">Shoulder</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fabric Selection */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Scissors className="h-4 w-4" />
                  Select Fabric
                </h4>
                <div className="space-y-2">
                  {fabrics.map(fabric => (
                    <button
                      key={fabric.name}
                      onClick={() => setSelectedFabric(fabric.name)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${selectedFabric === fabric.name ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200' : 'border-gray-200 hover:border-primary-300'}`}
                    >
                      <div className="text-left">
                        <div className="font-medium">{fabric.name}</div>
                        <div className="text-xs text-gray-500">{fabric.description}</div>
                      </div>
                      <div className={`text-sm font-medium ${fabric.price > 0 ? 'text-green-600' : fabric.price < 0 ? 'text-red-600' : 'text-gray-500'}`}>
                        {fabric.price > 0 ? `+₹${fabric.price}` : fabric.price < 0 ? `-₹${Math.abs(fabric.price)}` : 'Standard'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Quantity
                </h4>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <div className="flex-1 text-center">
                    <span className="text-3xl font-bold">{quantity}</span>
                    <div className="text-sm text-gray-500">items</div>
                  </div>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-4 space-y-2">
                  {quantity >= 10 && (
                    <div className="p-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-green-700 font-medium">🎉 15% Bulk Discount!</span>
                        <span className="text-green-600 font-bold">Save 15%</span>
                      </div>
                    </div>
                  )}
                  {quantity >= 5 && quantity < 10 && (
                    <div className="p-2 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-green-700 font-medium">10% Quantity Discount</span>
                        <span className="text-green-600 font-bold">Save 10%</span>
                      </div>
                    </div>
                  )}
                  {quantity >= 3 && quantity < 5 && (
                    <div className="p-2 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-blue-700 font-medium">5% Quantity Discount</span>
                        <span className="text-blue-600 font-bold">Save 5%</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Price Summary */}
              <div className="pt-6 border-t border-gray-200">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Price (x{quantity})</span>
                    <span>₹{product.discountPrice * quantity}</span>
                  </div>
                  {fabrics.find(f => f.name === selectedFabric)?.price !== 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">{selectedFabric} Fabric</span>
                      <span className={fabrics.find(f => f.name === selectedFabric)?.price > 0 ? 'text-green-600' : 'text-red-600'}>
                        {fabrics.find(f => f.name === selectedFabric)?.price > 0 ? '+' : ''}
                        ₹{fabrics.find(f => f.name === selectedFabric)?.price * quantity}
                      </span>
                    </div>
                  )}
                  {quantity >= 3 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quantity Discount</span>
                      <span className="text-green-600">
                        -{quantity >= 10 ? '15' : quantity >= 5 ? '10' : '5'}%
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200">
                    <span>Total Amount</span>
                    <span className="text-2xl text-primary-600">₹{calculatePrice()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Templates */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Templates</h3>
              <div className="grid grid-cols-4 gap-3">
                {templates.map(template => (
                  <button
                    key={template.id}
                    onClick={() => addTemplate(template)}
                    className="aspect-square rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all flex flex-col items-center justify-center p-2 group"
                    title={template.name}
                  >
                    <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">{template.thumbnail}</span>
                    <span className="text-xs text-gray-600">{template.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Uploaded Images */}
            {uploadedImages.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Uploads</h3>
                <div className="grid grid-cols-3 gap-2">
                  {uploadedImages.map(image => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => {
                          fabric.Image.fromURL(image.url, (img) => {
                            img.scaleToWidth(200)
                            img.set({ left: 150, top: 150 })
                            canvas.add(img)
                            saveHistory()
                          })
                        }}
                        className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100"
                      >
                        <span className="text-white text-xs bg-black/70 px-2 py-1 rounded">
                          Add to Design
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DesignPage