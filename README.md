# Hyperswarm RPC Communication

This project aims to establish peer-to-peer communication between Hyperswarm nodes using the `@hyperswarm/rpc` library. The goal is to enable nodes to easily call functions on each other using Remote Procedure Calls (RPC) over the Hyperswarm network.

## Status

🚧 **Incomplete** 🚧

The project is currently in development. The connection between nodes using `@hyperswarm/rpc` is not yet fully functional. Contributions or insights are welcome!

## Features

- Peer discovery using Hyperswarm topics.
- (In Progress) Remote procedure calls using `@hyperswarm/rpc`.

## Setup

1. Install the required dependencies:

```bash
npm install hyperswarm @hyperswarm/rpc hyperbee hypercore
```

2. Run the individual node scripts (once development is complete).

## Challenges Faced

- Establishing a reliable RPC connection over Hyperswarm.
- Ensuring data integrity and security during communication.
- Handling connection disruptions and re-establishing them.

## Contribution

If you have experience with Hyperswarm or P2P communication, your insights and contributions will be highly appreciated! Here's how you can contribute:

1. Clone the repository.
2. Create a new branch for your feature or fix.
3. Submit a pull request with a detailed description of the changes.

## Future Roadmap

- Complete the RPC integration for seamless communication between nodes.
- Implement robust error handling mechanisms.

---