import Fastify from 'fastify';

/**
 * Creates and configures the Fastify server instance for the Loan Orchestrator service.
 * The Loan Orchestrator manages users' lines of credit and coordinates with the Ledger Engine
 * for transaction processing.
 */
async function buildServer() {
  const fastify = Fastify({
    logger: true,
  });

  // Health check endpoint
  fastify.get('/health', async (request, reply) => {
    return { status: 'ok', service: 'loan-orchestrator' };
  });

  // Root endpoint
  fastify.get('/', async (request, reply) => {
    return {
      service: 'Loan Orchestrator',
      version: '0.0.1',
      description: 'Loan Orchestrator service',
    };
  });

  return fastify;
}

/**
 * Starts the Loan Orchestrator server.
 * This service manages the user's line of credit, validates transactions,
 * and schedules batched collections and disbursements.
 */
async function start() {
  const server = await buildServer();

  try {
    const portStr = process.env.PORT || '8080';
    const port = parseInt(portStr, 10);
    if (isNaN(port) || port < 1 || port > 65535) {
      throw new Error(`Invalid PORT: ${portStr}. Must be between 1-65535`);
    }
    const host = process.env.HOST || '0.0.0.0';

    await server.listen({ port, host });
    server.log.info({ host, port, service: 'loan-orchestrator' }, 'Server started');

    // Graceful shutdown handlers
    const close = async (signal: string) => {
      server.log.info({ signal }, 'Shutdown initiated');
      const shutdownTimeout = setTimeout(() => {
        server.log.error('Graceful shutdown timeout, forcing exit');
        process.exit(1);
      }, 10000); // 10 second timeout
      
      await server.close();
      clearTimeout(shutdownTimeout);
      server.log.info('Server closed successfully');
      process.exit(0);
    };

    process.on('SIGTERM', () => close('SIGTERM'));
    process.on('SIGINT', () => close('SIGINT'));
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

// Start the server
start().catch((err) => {
  // Error already logged by server.log.error in start()
  process.exit(1);
});

export { buildServer };
