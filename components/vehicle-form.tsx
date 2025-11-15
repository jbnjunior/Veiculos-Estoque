'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface Vehicle {
  id?: string
  brand: string
  model: string
  year: number
  color: string
  price: number
  mileage: number
  status: 'available' | 'sold' | 'discontinued'
}

interface VehicleFormProps {
  onSubmit: (vehicle: Omit<Vehicle, 'id'>) => void
  onCancel: () => void
  initialData?: Vehicle
}

export function VehicleForm({ onSubmit, onCancel, initialData }: VehicleFormProps) {
  const [formData, setFormData] = useState<Omit<Vehicle, 'id'>>({
    brand: initialData?.brand || '',
    model: initialData?.model || '',
    year: initialData?.year || new Date().getFullYear(),
    color: initialData?.color || '',
    price: initialData?.price || 0,
    mileage: initialData?.mileage || 0,
    status: initialData?.status || 'available',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.brand.trim()) newErrors.brand = 'Marca é obrigatória'
    if (!formData.model.trim()) newErrors.model = 'Modelo é obrigatório'
    if (formData.year < 1900 || formData.year > new Date().getFullYear() + 1) {
      newErrors.year = 'Ano inválido'
    }
    if (!formData.color.trim()) newErrors.color = 'Cor é obrigatória'
    if (formData.price < 0) newErrors.price = 'Preço não pode ser negativo'
    if (formData.mileage < 0) newErrors.mileage = 'Quilometragem não pode ser negativa'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
      setFormData({
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        color: '',
        price: 0,
        mileage: 0,
        status: 'available',
      })
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' || name === 'price' || name === 'mileage'
        ? Number(value)
        : value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-foreground">
            Marca *
          </label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Ex: Toyota, Honda, Ford"
            className={`w-full px-3 py-2 border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.brand ? 'border-destructive' : 'border-border'
            }`}
          />
          {errors.brand && (
            <p className="text-xs text-destructive mt-1">{errors.brand}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-foreground">
            Modelo *
          </label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="Ex: Corolla, Civic, Mustang"
            className={`w-full px-3 py-2 border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.model ? 'border-destructive' : 'border-border'
            }`}
          />
          {errors.model && (
            <p className="text-xs text-destructive mt-1">{errors.model}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-foreground">
            Ano *
          </label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            min="1900"
            max={new Date().getFullYear() + 1}
            className={`w-full px-3 py-2 border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.year ? 'border-destructive' : 'border-border'
            }`}
          />
          {errors.year && (
            <p className="text-xs text-destructive mt-1">{errors.year}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-foreground">
            Cor *
          </label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            placeholder="Ex: Preto, Branco, Prata"
            className={`w-full px-3 py-2 border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.color ? 'border-destructive' : 'border-border'
            }`}
          />
          {errors.color && (
            <p className="text-xs text-destructive mt-1">{errors.color}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-foreground">
            Preço (R$) *
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="1000"
            className={`w-full px-3 py-2 border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.price ? 'border-destructive' : 'border-border'
            }`}
          />
          {errors.price && (
            <p className="text-xs text-destructive mt-1">{errors.price}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-foreground">
            Quilometragem (km) *
          </label>
          <input
            type="number"
            name="mileage"
            value={formData.mileage}
            onChange={handleChange}
            min="0"
            step="100"
            className={`w-full px-3 py-2 border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.mileage ? 'border-destructive' : 'border-border'
            }`}
          />
          {errors.mileage && (
            <p className="text-xs text-destructive mt-1">{errors.mileage}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-2 text-foreground">
            Status *
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="available">Disponível</option>
            <option value="sold">Vendido</option>
            <option value="discontinued">Descontinuado</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="bg-primary hover:bg-primary/90">
          {initialData ? 'Atualizar' : 'Adicionar'} Veículo
        </Button>
        <Button type="button" onClick={onCancel} variant="outline">
          Cancelar
        </Button>
      </div>
    </form>
  )
}
