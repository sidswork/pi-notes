# PI Notes

Next.js based notes app. Designed to be deployed on local network (ex: raspberry pi).

Share content between multiple devices on the same network. Helps avoid using messaging platforms
for sharing notes/links/messages between devices on the same network.

All data is stored to `sqlite` database. No additional dependencies required.

## Deployment

Steps to deploy to a network device like a raspberry pi (or laptop/desktop)

1. Clone the repo `git clone https://github.com/sidswork/pi-notes.git`
2. Install dependencies `cd pi-notes && yarn`
3. Setup database `yarn setup:db`
4. Build `yarn build`
5. Start the server `yarn start`

Local network setup on linux

1. Allow incoming connections to port `3000` through the firewall
2. Note the IP address of the device
3. Access notes on all devices on the same network at `http://{ip-addr}:3000`

## Development

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
