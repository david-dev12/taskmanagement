import * as signalR from '@microsoft/signalr';

export const createConnection = (callbacks) => {
    const newConnection = new signalR.HubConnectionBuilder()
        .withUrl("/taskHub", {
            accessTokenFactory: () => localStorage.getItem('token'),
            transport: signalR.HttpTransportType.ServerSentEvents
        })
        //.configureLogging(signalR.LogLevel.Trace)
        .build();

    newConnection.on("TaskCreated", callbacks.onTaskCreated);
    newConnection.on("TaskUpdated", callbacks.onTaskUpdated);
    newConnection.on("TaskDeleted", callbacks.onTaskDeleted);

    return newConnection;
};