#ifdef opengl
varying vec2 tc;

uniform sampler2D texture;
uniform sampler2D texture1;

uniform float time;

float h0( sampler2D texture,
          vec2 pos, float time, float k ){
  float x = k*texture2D( texture, pos ).r*2.0*3.141 + time;
  
  return sin(x);
  }

float h( sampler2D t,
         sampler2D t1,
         vec2 pos, float time ){
  float x1 = 0.5*h0(t,  2.0*pos, time, 4.0) + 2.0*h0(t,  pos, time, 2.0);

  float kpos = 0.62;
  float x2 = 0.5*h0(t1, kpos*pos, time, 4.0) + 2.0*h0(t1, kpos*0.5*pos, time, 2.0);

  return mix(x1,x2, 0.25);
  }

void main() {
  vec2  d1 = vec2(1.0/1024.0, 0.0),
        d2 = vec2(0.0, 1.0/1024.0),
        t = tc;

  float dx = (h( texture, texture1, t-d1, time ) - h( texture, texture1, t+d1, time ));
  float dy = (h( texture, texture1, t-d2, time ) - h( texture, texture1, t+d2, time ));

  vec3 n = normalize(vec3(dx, dy, 0.8))*0.5+vec3(0.5);
  gl_FragColor = vec4( n, 1.0);
  }
  
#else
struct FS_Input {
  float4 position  : POSITION;
  float2 texcoord0 : TEXCOORD0;
};

struct FS_Output {
  float4 final : COLOR0;
};

float h0( uniform sampler2DRect texture,
          float2 pos, float time, float k ){
  float x = k*texRECT( texture, pos ).r*2*3.141 + time;
  
  return sin(x);
  }

float h( uniform sampler2DRect t,
         uniform sampler2DRect t1,
         float2 pos, float time ){
  float x1 = 0.5*h0(t,  2*pos, time, 4) + 2*h0(t,  pos, time, 2);

  float kpos = 0.62;
  float x2 = 0.5*h0(t1, kpos*pos, time, 4) + 2*h0(t1, kpos*0.5*pos, time, 2);

  return mix(x1,x2, 0.25);
  }

FS_Output main( FS_Input input,
                uniform sampler2DRect texture,
                uniform sampler2DRect texture1,
                uniform	float time ) {
  FS_Output ret;
  float2  d1 = float2(1.0/1024.0, 0),
          d2 = float2(0, 1.0/1024.0),
          t = input.texcoord0;

  float dx = (h( texture, texture1, t-d1, time ) - h( texture, texture1, t+d1, time ));
  float dy = (h( texture, texture1, t-d2, time ) - h( texture, texture1, t+d2, time ));

  float3 n = normalize(float3(dx, dy, 0.8))*0.5+float3(0.5);
  ret.final = float4( n, 1);
  return ret;
  }
#endif
