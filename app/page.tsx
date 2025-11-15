'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { VehicleList } from '@/components/vehicle-list'
import { VehicleForm } from '@/components/vehicle-form'
import { VehicleFilters } from '@/components/vehicle-filters'
import { Car, Plus, Menu, X } from 'lucide-react'

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

interface Filters {
  brand: string
  model: string
  priceMin: number | ''
  priceMax: number | ''
  yearMin: number | ''
  yearMax: number | ''
  status: string
}

export default function Home() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [filters, setFilters] = useState<Filters>({
    brand: '',
    model: '',
    priceMin: '',
    priceMax: '',
    yearMin: '',
    yearMax: '',
    status: '',
  })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [brands, setBrands] = useState<string[]>([])
  const [models, setModels] = useState<string[]>([])

  useEffect(() => {
    fetchVehicles()
  }, [])

  const fetchVehicles = async () => {
    try {
      const res = await fetch('/api/vehicles')
      const data = await res.json()
      setVehicles(data)
      setFilteredVehicles(data)
      extractBrandsAndModels(data)
    } catch (error) {
      console.error('Erro ao carregar veículos:', error)
    }
  }

  const extractBrandsAndModels = (vehicleList: Vehicle[]) => {
    const uniqueBrands = Array.from(new Set(vehicleList.map(v => v.brand)))
    const uniqueModels = Array.from(new Set(vehicleList.map(v => v.model)))
    setBrands(uniqueBrands as string[])
    setModels(uniqueModels as string[])
  }

  const applyFilters = (newFilters: Filters) => {
    setFilters(newFilters)
    let filtered = vehicles

    if (newFilters.brand) {
      filtered = filtered.filter(v => v.brand === newFilters.brand)
    }
    if (newFilters.model) {
      filtered = filtered.filter(v => v.model === newFilters.model)
    }
    if (newFilters.priceMin) {
      filtered = filtered.filter(v => v.price >= Number(newFilters.priceMin))
    }
    if (newFilters.priceMax) {
      filtered = filtered.filter(v => v.price <= Number(newFilters.priceMax))
    }
    if (newFilters.yearMin) {
      filtered = filtered.filter(v => v.year >= Number(newFilters.yearMin))
    }
    if (newFilters.yearMax) {
      filtered = filtered.filter(v => v.year <= Number(newFilters.yearMax))
    }
    if (newFilters.status) {
      filtered = filtered.filter(v => v.status === newFilters.status)
    }

    setFilteredVehicles(filtered)
  }

  const handleAddVehicle = async (vehicleData: Omit<Vehicle, 'id'>) => {
    try {
      const res = await fetch('/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vehicleData),
      })
      const newVehicle = await res.json()
      setVehicles([...vehicles, newVehicle])
      extractBrandsAndModels([...vehicles, newVehicle])
      applyFilters(filters)
      setShowForm(false)
    } catch (error) {
      console.error('Erro ao adicionar veículo:', error)
    }
  }

  const handleUpdateVehicle = async (id: string, vehicleData: Omit<Vehicle, 'id'>) => {
    try {
      const res = await fetch(`/api/vehicles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vehicleData),
      })
      const updated = await res.json()
      const newVehicles = vehicles.map(v => v.id === id ? updated : v)
      setVehicles(newVehicles)
      extractBrandsAndModels(newVehicles)
      applyFilters(filters)
      setEditingId(null)
      setShowForm(false)
    } catch (error) {
      console.error('Erro ao atualizar veículo:', error)
    }
  }

  const handleDeleteVehicle = async (id: string) => {
    try {
      await fetch(`/api/vehicles/${id}`, { method: 'DELETE' })
      const newVehicles = vehicles.filter(v => v.id !== id)
      setVehicles(newVehicles)
      extractBrandsAndModels(newVehicles)
      applyFilters(filters)
    } catch (error) {
      console.error('Erro ao deletar veículo:', error)
    }
  }

  const handleEdit = (vehicle: Vehicle) => {
    setEditingId(vehicle.id)
    setShowForm(true)
  }

  const editingVehicle = editingId ? vehicles.find(v => v.id === editingId) : null

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary p-2">
                <Car className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">AutoStock</h1>
            </div>
            <div className="hidden sm:flex gap-2">
              <Button
                onClick={() => {
                  setEditingId(null)
                  setShowForm(!showForm)
                }}
                className="gap-2 bg-primary hover:bg-primary/90"
              >
                <Plus className="h-4 w-4" />
                Novo Veículo
              </Button>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden text-foreground"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="pb-4 sm:hidden">
              <Button
                onClick={() => {
                  setEditingId(null)
                  setShowForm(true)
                  setMobileMenuOpen(false)
                }}
                className="w-full gap-2 bg-primary hover:bg-primary/90"
              >
                <Plus className="h-4 w-4" />
                Novo Veículo
              </Button>
            </div>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4 text-foreground">Filtros</h2>
              <VehicleFilters
                onFilterChange={applyFilters}
                brands={brands}
                models={models}
              />
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {showForm && (
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4 text-foreground">
                  {editingId ? 'Editar Veículo' : 'Adicionar Novo Veículo'}
                </h2>
                <VehicleForm
                  onSubmit={editingId 
                    ? (data) => handleUpdateVehicle(editingId, data)
                    : handleAddVehicle
                  }
                  initialData={editingVehicle || undefined}
                  onCancel={() => {
                    setShowForm(false)
                    setEditingId(null)
                  }}
                />
              </Card>
            )}

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="text-sm text-muted-foreground">Total de Veículos</div>
                <div className="text-2xl font-bold text-primary">{vehicles.length}</div>
              </Card>
              <Card className="p-4">
                <div className="text-sm text-muted-foreground">Disponíveis</div>
                <div className="text-2xl font-bold text-accent">
                  {vehicles.filter(v => v.status === 'available').length}
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-sm text-muted-foreground">Vendidos</div>
                <div className="text-2xl font-bold text-destructive">
                  {vehicles.filter(v => v.status === 'sold').length}
                </div>
              </Card>
            </div>

            {/* Vehicle List */}
            <Card>
              <VehicleList
                vehicles={filteredVehicles}
                onEdit={handleEdit}
                onDelete={handleDeleteVehicle}
              />
            </Card>

            {filteredVehicles.length === 0 && (
              <Card className="p-12 text-center">
                <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhum veículo encontrado</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
