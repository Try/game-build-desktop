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
