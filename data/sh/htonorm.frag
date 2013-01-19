struct FS_Input {
  float4 position  : POSITION;
  float2 texcoord0 : TEXCOORD0;
};

struct FS_Output {
  float4 final : COLOR0;
};

float h0( uniform sampler2DRect texture, float2 pos, float time, float k ){
  float x = k*texRECT( texture, pos ).r*2*3.141 + time;
  
  return sin(x);
  }

float h( uniform sampler2DRect t, float2 pos, float time ){
  return 0.5*h0(t, 2*pos, time, 4) + 2*h0(t, pos, time, 2);
  }

FS_Output main( FS_Input input,
                uniform sampler2DRect texture,
                uniform	float time ) {
  FS_Output ret;
  float2  d1 = float2(1.0/1024.0, 0),
          d2 = float2(0, 1.0/1024.0),
          t = input.texcoord0;

  float dx = (h( texture, t-d1, time ) - h( texture, t+d1, time ));
  float dy = (h( texture, t-d2, time ) - h( texture, t+d2, time ));

  float3 n = normalize(float3(dx, dy, 0.8))*0.5+float3(0.5);
  ret.final = float4( n, 1);
  return ret;
  }
