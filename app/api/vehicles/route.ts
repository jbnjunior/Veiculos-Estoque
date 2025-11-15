import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

// Dados persistidos em memória (para demonstração)
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

export async function GET() {
  return NextResponse.json(vehiclesData)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const newVehicle = {
    id: uuidv4(),
    ...body,
  }
  vehiclesData.push(newVehicle)
  return NextResponse.json(newVehicle, { status: 201 })
}
