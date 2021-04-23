import { io } from '../http';
import { ConnectionsService } from '../services/ConnectionsService';
import { UsersService } from '../services/UsersService';
import { MessagesService } from '../services/MessagesService';

interface IParams {
  email: string;
  text: string;
}

io.on('connect', (socket) => {
  const connectionsService = new ConnectionsService();
  const usersService = new UsersService();
  const messagesService = new MessagesService();

  socket.on('client_first_access', async (params) => {
    const socket_id = socket.id;
    const { email, text } = params as IParams;
    let user_id = null;

    const userExists = await usersService.findByEmail(email);
    
   if (!userExists) {
        const user = await usersService.create(email);

        await connectionsService.create({
          socket_id,
          user_id: user.id
        }); 

        user_id = user.id;
        console.log('novo user_id', user_id);
    } else {
        user_id = userExists.id;
        console.log('existe user_id', user_id);
      const connection = await connectionsService.findByUserId(userExists.id);

      if (!connection) {
        await connectionsService.create({
          socket_id,
          user_id: userExists.id
        });
      } else {
        connection.socket_id = socket_id;
        await connectionsService.create(connection);
      }
    }

    await messagesService.create({
      text,
      user_id
    });

    console.log(params);
  });
});