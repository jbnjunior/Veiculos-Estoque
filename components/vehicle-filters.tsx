'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface Filters {
  brand: string
  model: string
  priceMin: number | ''
  priceMax: number | ''
  yearMin: number | ''
  yearMax: number | ''
  status: string
}

interface VehicleFiltersProps {
  onFilterChange: (filters: Filters) => void
  brands: string[]
  models: string[]
}

export function VehicleFilters({ onFilterChange, brands, models }: VehicleFiltersProps) {
  const [filters, setFilters] = useState<Filters>({
    brand: '',
    model: '',
    priceMin: '',
    priceMax: '',
    yearMin: '',
    yearMax: '',
    status: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target
    const newFilters = {
      ...filters,
      [name]: value === '' ? '' : value,
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleReset = () => {
    const resetFilters = {
      brand: '',
      model: '',
      priceMin: '',
      priceMax: '',
      yearMin: '',
      yearMax: '',
      status: '',
    }
    setFilters(resetFilters)
    onFilterChange(resetFilters)
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2 text-foreground">Marca</label>
        <select
          name="brand"
          value={filters.brand}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Todas as marcas</option>
          {brands.map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-foreground">Modelo</label>
        <select
          name="model"
          value={filters.model}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Todos os modelos</option>
          {models.map(model => (
            <option key={model} value={model}>{model}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-foreground">Preço Mínimo</label>
        <input
          type="number"
          name="priceMin"
          value={filters.priceMin}
          onChange={handleChange}
          placeholder="Ex: 10000"
          className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-foreground">Preço Máximo</label>
        <input
          type="number"
          name="priceMax"
          value={filters.priceMax}
          onChange={handleChange}
          placeholder="Ex: 50000"
          className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-foreground">Ano Mínimo</label>
        <input
          type="number"
          name="yearMin"
          value={filters.yearMin}
          onChange={handleChange}
          placeholder="Ex: 2015"
          className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-foreground">Ano Máximo</label>
        <input
          type="number"
          name="yearMax"
          value={filters.yearMax}
          onChange={handleChange}
          placeholder="Ex: 2024"
          className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-foreground">Status</label>
        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Todos os status</option>
          <option value="available">Disponível</option>
          <option value="sold">Vendido</option>
          <option value="discontinued">Descontinuado</option>
        </select>
      </div>

      <Button
        onClick={handleReset}
        variant="outline"
        className="w-full"
      >
        Limpar Filtros
      </Button>
    </div>
  )
}
