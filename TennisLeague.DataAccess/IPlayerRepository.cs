﻿using TennisLeague.Data;

namespace TennisLeague.DataAccess
{
    public interface IPlayerRepository
    {
        Player? GetPlayerById(int id);
        IEnumerable<Player> GetAllPlayers();
        int? AddPlayer(Player player);
        void Update(Player player);
    }
}
