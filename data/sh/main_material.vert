#ifdef opengl
attribute vec3 Position;
attribute vec2 TexCoord;
attribute vec3 Normal;
attribute vec4 Color;
attribute vec4 Binormal;
#ifdef water
attribute float Depth;
attribute vec2  TexCoord1;
#endif

varying vec2 tc;
varying vec3 normal, bnormal;
varying vec4 cl;

#ifdef shadows
varying vec3 shPos;
#endif

uniform mat4 mvpMatrix;
uniform mat4 objectMatrix;

#ifdef shadows
uniform mat4 shadowMatrix;
#endif

void main() {
  tc = TexCoord;
  cl = Color;

  vec4 p = mvpMatrix*vec4( Position, 1.0 );
  normal  = normalize(objectMatrix*vec4( Normal.x,   Normal.y,   Normal.z,   0.0 )).xyz;
  bnormal = normalize(objectMatrix*vec4( Binormal.x, Binormal.y, Binormal.z, 0.0 )).xyz;
  //normal.z *= -1.0;
  
#ifdef shadows
  vec4 _shPos = shadowMatrix*vec4( Position, 1.0 );
  shPos   = _shPos.xyz/_shPos.w;
  shPos.y = -shPos.y;
#endif
  
  gl_Position = vec4(p.x, -p.y, p.z, p.w); 
  }
  
#else
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
                       1.0  );
    //v.xyz += 4*normalize(mvpMatrix._m00_m01_m02);

    float4 n = float4( IN.normal.x,
                       IN.normal.y,
                       IN.normal.z,
                       0.0 );

    float4x4 m = objectMatrix;

    OUT.position   = mul( mvpMatrix, v );
    OUT.bnormal    = mul( m, float4( IN.bnormal.x,
                                     IN.bnormal.y,
                                     IN.bnormal.z,
                                     0.0 ) );
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
    
#endif
