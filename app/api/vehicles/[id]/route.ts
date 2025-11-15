import { NextRequest, NextResponse } from 'next/server'

// Dados persistidos em memória (mesmo array do GET de veículos)
let vehiclesData: any[] = [
  {
    id: '1',
    brand: 'Toyota',
    model: 'Corolla',
    year: 2023,
    color: 'Prata',
    price: 85000,
    mileage: 15000,
    status: 'available',
  },
  {
    id: '2',
    brand: 'Honda',
    model: 'Civic',
    year: 2022,
    color: 'Preto',
    price: 95000,
    mileage: 25000,
    status: 'available',
  },
  {
    id: '3',
    brand: 'Ford',
    model: 'Mustang',
    year: 2021,
    color: 'Vermelho',
    price: 150000,
    mileage: 35000,
    status: 'sold',
  },
  {
    id: '4',
    brand: 'Volkswagen',
    model: 'Gol',
    year: 2023,
    color: 'Branco',
    price: 55000,
    mileage: 8000,
    status: 'available',
  },
  {
    id: '5',
    brand: 'Fiat',
    model: 'Uno',
    year: 2022,
    color: 'Azul',
    price: 45000,
    mileage: 30000,
    status: 'available',
  },
]

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params
  const body = await request.json()

  const index = vehiclesData.findIndex(v => v.id === id)
  if (index === -1) {
    return NextResponse.json({ error: 'Veículo não encontrado' }, { status: 404 })
  }

  vehiclesData[index] = {
    ...vehiclesData[index],
    ...body,
  }

  return NextResponse.json(vehiclesData[index])
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params
  
  const index = vehiclesData.findIndex(v => v.id === id)
  if (index === -1) {
    return NextResponse.json({ error: 'Veículo não encontrado' }, { status: 404 })
  }

  vehiclesData.splice(index, 1)
  return NextResponse.json({ success: true })
}
