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
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
    const host = process.env.HOST || '0.0.0.0';

    await server.listen({ port, host });
    console.log(`Loan Orchestrator server listening on ${host}:${port}`);

    // Graceful shutdown handlers
    const close = async (signal: string) => {
      console.log(`Received ${signal}, closing Loan Orchestrator server...`);
      await server.close();
      console.log('Loan Orchestrator server closed successfully');
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
  console.error('Failed to start Loan Orchestrator:', err);
  process.exit(1);
});

export { buildServer };
