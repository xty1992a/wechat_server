const PI = Math.PI * 3000.0 / 180.0;

export function bd09_To_Gcj02(bd_lon, bd_lng) {
  const x = bd_lon - 0.0065, y = bd_lng - 0.006;
  const z = Math.sqrt(x * x + y * y) - 0.0002 * Math.sin(y * PI);
  const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * PI);
  return {
	lng: z * Math.cos(theta),
	lat: z * Math.sin(theta)
  };
}

export function gcj02_To_Bd09(gg_lon, gg_lat) {
  const x = gg_lon, y = gg_lat;
  const z = Math.sqrt(x * x + y * y) + 0.0002 * Math.sin(y * PI);
  const theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * PI);
  return {
	lng: z * Math.cos(theta) + 0.0065,
	lat: z * Math.sin(theta) + 0.006
  };
}


