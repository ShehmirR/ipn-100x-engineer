import { NextRequest, NextResponse } from 'next/server';
import { getUserFavorites, addFavorite, removeFavorite } from '@/utils/storage';

// Helper to get user ID from session
function getUserIdFromSession(request: NextRequest): string | null {
  return request.cookies.get('session')?.value || null;
}

// GET - Retrieve user's favorite restaurants
export async function GET(request: NextRequest) {
  try {
    const userId = getUserIdFromSession(request);

    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const favorites = getUserFavorites(userId);

    return NextResponse.json({
      favorites,
      count: favorites.length,
    });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Add a restaurant to favorites
export async function POST(request: NextRequest) {
  try {
    const userId = getUserIdFromSession(request);

    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { restaurantId } = body;

    if (!restaurantId) {
      return NextResponse.json(
        { error: 'restaurantId is required' },
        { status: 400 }
      );
    }

    addFavorite(userId, restaurantId);

    return NextResponse.json({
      success: true,
      message: 'Restaurant added to favorites',
    });
  } catch (error) {
    console.error('Error adding favorite:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Remove a restaurant from favorites
export async function DELETE(request: NextRequest) {
  try {
    const userId = getUserIdFromSession(request);

    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const restaurantId = searchParams.get('restaurantId');

    if (!restaurantId) {
      return NextResponse.json(
        { error: 'restaurantId is required' },
        { status: 400 }
      );
    }

    removeFavorite(userId, restaurantId);

    return NextResponse.json({
      success: true,
      message: 'Restaurant removed from favorites',
    });
  } catch (error) {
    console.error('Error removing favorite:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
