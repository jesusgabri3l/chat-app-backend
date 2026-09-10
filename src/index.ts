import './env';

import { httpServer } from './app';
import { registerSocketHandlers } from './controllers/socket/socket';

registerSocketHandlers(httpServer);

const port = process.env.PORT || 5000;
httpServer.listen(port, () => console.log(`🚀 Server running on port ${port}`));
