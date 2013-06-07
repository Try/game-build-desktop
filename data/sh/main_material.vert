#ifdef opengl
#ifndef oes_render
#define lowp
#endif
attribute lowp vec4 Position;
//attribute lowp vec2 TexCoord;
attribute lowp vec4 Normal;
//attribute lowp vec4 Color;
attribute lowp vec4 Binormal;
#ifdef water
attribute lowp float Depth;
attribute lowp vec2  TexCoord1;
#endif

varying lowp vec2 tc;
varying vec3 normal;
#if bumpMapping
varying vec3 bnormal, tnormal;
#endif
//varying lowp vec4 cl;

#if shadows
varying vec3 shPos;
#endif
#if oclusion
varying lowp vec3 oclusionPos;
#endif

uniform mat4 mvpMatrix;
uniform mat4 objectMatrix;

#if shadows
uniform mat4 shadowMatrix;
#endif
#if oclusion
uniform mat4 oclusionMapMatrix;
#endif

#ifdef terrainCL
varying lowp float terrainColorMul;
#endif

void main() {
  tc = vec2(Position.w, Normal.w);
  //cl = Color;
  #ifdef terrainCL
  terrainColorMul = Binormal.w;
  #endif

  vec4 p  = mvpMatrix*vec4( Position.xyz, 1.0 );
  vec3 n  = -normalize(objectMatrix*vec4( Normal.x,   Normal.y,   Normal.z,   0.0 )).xyz;
  normal  = n;
#if bumpMapping
  vec3 b = -normalize(objectMatrix*vec4( Binormal.x, Binormal.y, Binormal.z, 0.0 )).xyz;
  bnormal = b;
  tnormal = cross(n,b);
#endif
  //normal.z *= -1.0;
  vec4 objPos = objectMatrix*vec4( Position.xyz, 1.0 );
#if shadows
  {
  vec4 _shPos = shadowMatrix*objPos;
  _shPos.xy += vec2(1.0);
  _shPos.xy /= 2.0;
  shPos   = _shPos.xyz/_shPos.w;
  }
#endif
#if oclusion
  {
    vec4 _shPos = oclusionMapMatrix*objPos;
    _shPos.xy += vec2(1.0);
    _shPos.xy /= 2.0;
    oclusionPos  = _shPos.xyz/_shPos.w;
  }
#endif
  
  gl_Position = vec4(p.x, p.y, p.z, p.w); 
  }
  
#else
struct VS_Input {
    float4 position  : POSITION;
    //float2 texcoord0 : TEXCOORD0;
    float4 normal    : NORMAL;
    //float4 color     : COLOR;
    float4 bnormal   : BINORMAL;
	#ifdef water
    //float depth      : DEPTH;
    float2 dir       : TEXCOORD1;
    #endif
    };

struct FS_Input {
  float4 position  : POSITION;
  //float4 color     : COLOR;
  float4 bnormal   : TEXCOORD7;
#ifdef terrainCL
  float  terrainColorMul   : TEXCOORD8;
#endif

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
#if oclusion
  float4 oclusionPos: TEXCOORD6;
#endif
    };

FS_Input main( VS_Input IN,
               uniform float4x4 mvpMatrix,
               uniform float4x4 objectMatrix
#ifdef shadows
               ,uniform float4x4 shadowMatrix
#endif
#if oclusion
               ,uniform mat4 oclusionMapMatrix
#endif
               ) {
    FS_Input OUT;
	
#ifdef terrainCL
	OUT.terrainColorMul = IN.bnormal.w;
#endif
    //OUT.color = IN.color;
#ifdef water
    OUT.waterDepth.xy = IN.dir;
    OUT.waterDepth.z  = IN.bnormal.w;//IN.depth;
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

    float4 objPos = mul( m, v );
#ifdef shadows
{
    float4 shPos = mul( shadowMatrix, objPos );
    OUT.shPosition =shPos;
    }
#endif

#if oclusion
{
    float4 shPos = mul( oclusionMapMatrix, objPos );
    shPos/=shPos.w;

    shPos.y *= -1;
    shPos.xy += float2(1);
    shPos.xy /= 2.0;
    OUT.oclusionPos = shPos;
    }
#endif

#ifdef displace
    OUT.screenPos  = OUT.position/OUT.position.w;	
#endif

#ifdef diffuseTexture
    OUT.texcoord0  = float2(IN.position.w, IN.normal.w);//IN.texcoord0;	
#endif

    OUT.normal.xyz  = mul( m, n ).xyz;
    OUT.objPosition = objPos;
    OUT.normal.a    = OUT.position.z/OUT.position.w;
	
    return OUT;
    }
    
#endif
