export async function GET(req: any) {
  const userIp = req.headers.get('x-forwarded-for') || req.ip || 'Unknown IP';
  return Response.json({ ip: userIp });
}
