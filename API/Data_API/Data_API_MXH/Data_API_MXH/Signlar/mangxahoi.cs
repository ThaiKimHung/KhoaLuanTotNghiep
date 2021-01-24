﻿using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using Data_API_MXH.Controllers.User_Admin;
//using TeduShop.Service;
//using TeduShop.Web.Infrastructure.Core;
//using TeduShop.Web.Models.Common;

namespace MangXaHoi.SignalR
{

    //[RoutePrefix("signalr/mangxahoi")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class mangxahoi : Hub
    {
        private readonly static ConnectionMapping<string> _connections =
            new ConnectionMapping<string>();
        //private static Dictionary<string, string> ConnectedClients = new Dictionary<string, string>();

        public mangxahoi()
        {
        }
        private static IHubContext hubContext =
        GlobalHost.ConnectionManager.GetHubContext<mangxahoi>();

        public static void PushToAllUsers(Object message, mangxahoi hub)
        {
            IHubConnectionContext<dynamic> clients = GetClients(hub);
            clients.All.addAnnouncement(message);
        }

        public static void PushToAllMessenger(Object message, mangxahoi hub)
        {
            IHubConnectionContext<dynamic> clients = GetClients(hub);
            clients.All.sendMessenger(message);
        }

        public static void PushTChangelUsers_Group(Object message, mangxahoi hub)
        {
            IHubConnectionContext<dynamic> clients = GetClients(hub);
            clients.All.changeuser_group(message);
        }

        public static void PushTChangelUsers(Object message, mangxahoi hub)
        {
            IHubConnectionContext<dynamic> clients = GetClients(hub);
            clients.All.changeuser(message);
        }

        public static void PushTChangelThongDiep(Object message, mangxahoi hub)
        {
            IHubConnectionContext<dynamic> clients = GetClients(hub);
            clients.All.changesThongDiep(message);
        }

        public static void PushToAllUsers_CheckOnline(Object message, mangxahoi hub)
        {
            IHubConnectionContext<dynamic> clients = GetClients(hub);
            clients.All.checkuser_connect(message);
        }
        /// <summary>
        /// Push to a specific user
        /// </summary>
        /// <param name="who"></param>
        /// <param name="message"></param>
        public static void PushToUser(string who, Object message, mangxahoi hub)
        {
            IHubConnectionContext<dynamic> clients = GetClients(hub);
            foreach (var connectionId in _connections.GetConnections(who))
            {
                clients.Client(connectionId).addChatMessage(message);
            }
        }

        /// <summary>
        /// Push to list users
        /// </summary>
        /// <param name="who"></param>
        /// <param name="message"></param>
        public static void PushToUsers(string[] whos, Object message, mangxahoi hub)
        {
            IHubConnectionContext<dynamic> clients = GetClients(hub);
            for (int i = 0; i < whos.Length; i++)
            {
                var who = whos[i];
                foreach (var connectionId in _connections.GetConnections(who))
                {
                    clients.Client(connectionId).addChatMessage(message);
                }
            }

        }
        private static IHubConnectionContext<dynamic> GetClients(mangxahoi teduShopHub)
        {
            if (teduShopHub == null)
                return GlobalHost.ConnectionManager.GetHubContext<mangxahoi>().Clients;
            else
                return teduShopHub.Clients;
        }

        /// <summary>
        /// Connect user to hub
        /// </summary>
        /// <returns></returns>
        public override Task OnConnected()
        {
            var id_user = Context.QueryString["id_user"];
            _connections.Add(id_user, Context.ConnectionId);
            int id = int.Parse(id_user);
            UserController.UpdateUserName_Online(id);
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            var id_user = Context.QueryString["id_user"];
            _connections.Remove(id_user, Context.ConnectionId);
            int id = int.Parse(id_user);
            UserController.UpdateUserName_Offline(id);
            return base.OnDisconnected(stopCalled);
        }


        public override Task OnReconnected()
        {
            var id_user = Context.QueryString["id_user"];
            if (!_connections.GetConnections(id_user).Contains(Context.ConnectionId))
            {
                _connections.Add(id_user, Context.ConnectionId);
            }

            return base.OnReconnected();
        }

    }
}