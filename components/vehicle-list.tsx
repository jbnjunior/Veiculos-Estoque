'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Edit, Trash2, Check, X } from 'lucide-react'

interface Vehicle {
  id: string
  brand: string
  model: string
  year: number
  color: string
  price: number
  mileage: number
  status: 'available' | 'sold' | 'discontinued'
}

interface VehicleListProps {
  vehicles: Vehicle[]
  onEdit: (vehicle: Vehicle) => void
  onDelete: (id: string) => void
}

export function VehicleList({ vehicles, onEdit, onDelete }: VehicleListProps) {
  const getStatusBadge = (status: Vehicle['status']) => {
    const statusConfig = {
      available: { bg: 'bg-green-100 dark:bg-green-900', text: 'text-green-800 dark:text-green-200', label: 'Disponível' },
      sold: { bg: 'bg-red-100 dark:bg-red-900', text: 'text-red-800 dark:text-red-200', label: 'Vendido' },
      discontinued: { bg: 'bg-gray-100 dark:bg-gray-900', text: 'text-gray-800 dark:text-gray-200', label: 'Descontinuado' },
    }
    const config = statusConfig[status]
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price)
  }

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('pt-BR').format(mileage)
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="border-b border-border bg-secondary">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Marca/Modelo</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Ano</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Cor</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Preço</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">KM</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Status</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Ações</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id} className="border-b border-border hover:bg-muted/50">
              <td className="px-4 py-3 text-sm font-medium">
                <div>{vehicle.brand}</div>
                <div className="text-xs text-muted-foreground">{vehicle.model}</div>
              </td>
              <td className="px-4 py-3 text-sm">{vehicle.year}</td>
              <td className="px-4 py-3 text-sm">{vehicle.color}</td>
              <td className="px-4 py-3 text-sm font-medium">{formatPrice(vehicle.price)}</td>
              <td className="px-4 py-3 text-sm">{formatMileage(vehicle.mileage)}</td>
              <td className="px-4 py-3 text-sm">{getStatusBadge(vehicle.status)}</td>
              <td className="px-4 py-3 text-sm">
                <div className="flex gap-2">
                  <Button
                    onClick={() => onEdit(vehicle)}
                    size="sm"
                    variant="outline"
                    className="gap-1"
                  >
                    <Edit className="h-4 w-4" />
                    <span className="hidden sm:inline">Editar</span>
                  </Button>
                  <Button
                    onClick={() => {
                      if (confirm('Tem certeza que deseja deletar este veículo?')) {
                        onDelete(vehicle.id)
                      }
                    }}
                    size="sm"
                    variant="outline"
                    className="gap-1 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Deletar</span>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
