import type { APIRoute } from 'astro';

const STEAM_API_KEY = import.meta.env.STEAM_API_KEY;
const STEAM_USER_ID = import.meta.env.PUBLIC_STEAM_USER_ID;

export const GET: APIRoute = async ({ request }) => {
  try {
    console.log('Steam API Debug:', {
      apiKeyExists: !!STEAM_API_KEY,
      userIdExists: !!STEAM_USER_ID,
      userId: STEAM_USER_ID,
      apiKeyLength: STEAM_API_KEY?.length || 0
    });

    if (!STEAM_API_KEY || !STEAM_USER_ID) {
      return new Response(
        JSON.stringify({
          error: 'Steam API credentials not configured',
          debug: {
            apiKeyExists: !!STEAM_API_KEY,
            userIdExists: !!STEAM_USER_ID
          }
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${STEAM_USER_ID}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.response?.players || data.response.players.length === 0) {
      return new Response(
        JSON.stringify({ gameId: null, gameName: null }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const player = data.response.players[0];
    const gameId = player.gameid || null;
    const gameName = player.gameextrainfo || null;

    return new Response(
      JSON.stringify({ gameId, gameName }),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=30'
        } 
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch Steam data' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
