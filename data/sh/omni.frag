struct FS_Input {
  float4 position  : POSITION;
  float2 texcoord0 : TEXCOORD0;
  float2 cenPos    : TEXCOORD1;

  float3 pos       : TEXCOORD2;
  float3 lpos      : TEXCOORD3;
  };

struct FS_Output {
  float4 color    : COLOR0;
  };

float DepthToLinearZ(float dVal)
{
  float near = 0.1, far = 100.0;
  return (far*near) / (far-(dVal*(far-near)));
}

FS_Output main( FS_Input input,
                uniform float4x4 invMatrix,
                uniform sampler2DRect texture,
                uniform sampler2DRect albedo,
                uniform sampler2DRect normals,
                uniform float2 dTexCoord
                ) {
    FS_Output ret;
    float val = 1.0;

    float2 tc0 = input.texcoord0 + dTexCoord;
    float  z0  = texRECT( texture, tc0 ).r;

    //float3 position = normalize( input.pos )*DepthToLinearZ(z0);
    float3 position = input.pos;
    position.z = z0;
    float4 tmpP = mul( invMatrix, float4(position, 1) );
    position = tmpP.xyz/tmpP.w;

    float2 diff = input.cenPos - tc0 + dTexCoord;
    float zdiff = texRECT( texture, input.cenPos + dTexCoord ).r - z0;

    for( int i=0; i<21; ++i ){
      float localZ = texRECT( texture, tc0+diff*i/20.0 ).r;
      val -= max(0, -500*( localZ - (z0 + zdiff*i/20.0)) );
      }

    val = clamp(val, 0, 1);
    //ret.color = texRECT( albedo, tc0 )*float4(val, val, val, 1);

    float3 n = normalize( texRECT( normals, tc0 ).xyz*2.0 - float3(1.0) );
    position = input.lpos-position;

    float l = length(position);

    float lamb = max( -dot( n, normalize(position) ), 0 );

    val = val*1.0/(0.5 + 0.1*l + 0.5*l*l )*(1.0-l);

    //ret.color = float4( l, l, l, 1.0-l );
    ret.color = lamb*texRECT( albedo, tc0 )*float4(val, val, val, 1)*float4(0.6, 0.4, 0.6, 1.0);
    ret.color.a = length( ret.color.rgb );
    //ret.color = float4(n,1);

    return ret;
    }
