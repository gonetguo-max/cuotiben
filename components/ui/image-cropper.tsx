"use client"

import { useState, useRef, useCallback } from "react"
import { Crop, RotateCw, ZoomIn, ZoomOut, Check, X } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"
import { ModernCard } from "@/components/ui/modern-card"
import { Slider } from "@/components/ui/slider"

interface ImageCropperProps {
  src: string
  onCrop: (croppedImage: string) => void
  onCancel: () => void
  aspectRatio?: number
}

export function ImageCropper({ src, onCrop, onCancel, aspectRatio = 1 }: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 100, height: 100 })
  const [zoom, setZoom] = useState([1])
  const [rotation, setRotation] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const handleCrop = useCallback(() => {
    if (!canvasRef.current || !imageRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const image = imageRef.current

    if (!ctx) return

    // Set canvas size
    canvas.width = crop.width
    canvas.height = crop.height

    // Apply transformations
    ctx.save()
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate((rotation * Math.PI) / 180)
    ctx.scale(zoom[0], zoom[0])

    // Draw cropped image
    ctx.drawImage(image, -crop.width / 2, -crop.height / 2, crop.width, crop.height)

    ctx.restore()

    // Get cropped image data
    const croppedImageData = canvas.toDataURL("image/jpeg", 0.9)
    onCrop(croppedImageData)
  }, [crop, zoom, rotation, onCrop])

  const rotate = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <ModernCard variant="glass" className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Crop className="w-5 h-5" />
            图片裁剪
          </h2>
          <button onClick={onCancel} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Image Preview */}
          <div className="relative bg-gray-100 rounded-xl overflow-hidden" style={{ aspectRatio }}>
            <img
              ref={imageRef}
              src={src || "/placeholder.svg"}
              alt="Crop preview"
              className="w-full h-full object-contain"
              style={{
                transform: `scale(${zoom[0]}) rotate(${rotation}deg)`,
                transition: "transform 0.2s ease",
              }}
            />

            {/* Crop overlay */}
            <div className="absolute inset-0 border-2 border-dashed border-blue-500 bg-blue-500/10" />
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">缩放: {zoom[0].toFixed(1)}x</label>
              <div className="flex items-center gap-3">
                <ZoomOut className="w-4 h-4 text-gray-500" />
                <Slider value={zoom} onValueChange={setZoom} min={0.5} max={3} step={0.1} className="flex-1" />
                <ZoomIn className="w-4 h-4 text-gray-500" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <GradientButton variant="secondary" onClick={rotate} className="flex items-center gap-2">
                <RotateCw className="w-4 h-4" />
                旋转 90°
              </GradientButton>

              <div className="flex gap-3">
                <GradientButton variant="secondary" onClick={onCancel}>
                  取消
                </GradientButton>
                <GradientButton variant="primary" onClick={handleCrop}>
                  <Check className="w-4 h-4 mr-2" />
                  确认裁剪
                </GradientButton>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden canvas for cropping */}
        <canvas ref={canvasRef} className="hidden" />
      </ModernCard>
    </div>
  )
}
