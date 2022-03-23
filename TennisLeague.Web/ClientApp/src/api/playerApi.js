export async function getAllPlayers() {
    return await fetch(`/player`);
}