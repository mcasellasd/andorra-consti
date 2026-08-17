export function logEvent(event: string, fields: Record<string, unknown> = {}): void {
  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    event,
    railwayReplicaId: process.env.RAILWAY_REPLICA_ID || null,
    ...fields,
  }));
}

export function requestIdFromHeader(value: string | string[] | undefined): string {
  const id = Array.isArray(value) ? value[0] : value;
  return id?.slice(0, 128) || crypto.randomUUID();
}
