struct VS_Input {
    float3 position  : POSITION;
    float2 texcoord0 : TEXCOORD0;
    float3 normal    : NORMAL;
    float4 color     : COLOR;
    float4 bnormal   : BINORMAL;
	#ifdef water
    float depth      : DEPTH;
    float2 dir       : TEXCOORD1;
  #endif
    };

struct FS_Input {
  float4 position  : POSITION;
  float4 color     : COLOR;
  float4 bnormal   : TEXCOORD7;

#ifdef diffuseTexture
  float2 texcoord0 : TEXCOORD0;
#endif

  float4 normal      : TEXCOORD1;
  float4 objPosition : TEXCOORD2;

#ifdef shadows
  float4 shPosition : TEXCOORD3;
#endif

#ifdef displace
  float3 screenPos     : TEXCOORD4;
#endif
#ifdef water
  float4 waterDepth : TEXCOORD5;
#endif
    };

FS_Input main( VS_Input IN,
               uniform float4x4 mvpMatrix,
               uniform float4x4 objectMatrix
#ifdef shadows
               ,uniform float4x4 shadowMatrix
#endif
               ) {
    FS_Input OUT;
    OUT.color = IN.color;
#ifdef water
    OUT.waterDepth.xy = IN.dir;
    OUT.waterDepth.z  = IN.depth;
#endif

    float4 v = float4( IN.position.x,
                       IN.position.y,
                       IN.position.z,
                       1.0f  );
    //v.xyz += 4*normalize(mvpMatrix._m00_m01_m02);

    float4 n = float4( IN.normal.x,
                       IN.normal.y,
                       IN.normal.z,
                       0.0f );

    float4x4 m = objectMatrix;

    OUT.position   = mul( mvpMatrix, v );
    OUT.bnormal    = mul( m, float4( IN.bnormal.x,
                                             IN.bnormal.y,
                                             IN.bnormal.z,
                                             0.0f ) );
    //OUT.bnormal = IN.bnormal;

#ifdef shadows
    float4 s = mul( shadowMatrix, v );
    OUT.shPosition = s;
#endif

#ifdef displace
    OUT.screenPos  = OUT.position/OUT.position.w;	
#endif

#ifdef diffuseTexture
    OUT.texcoord0  = IN.texcoord0;	
#endif

    OUT.normal.xyz  = mul( m, n ).xyz;
    OUT.objPosition = mul( m, v );
    OUT.normal.a    = OUT.position.z/OUT.position.w;
	
    return OUT;
    }
