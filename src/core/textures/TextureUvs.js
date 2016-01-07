
/**
 * A standard object to store the Uvs of a texture
 *
 * @class
 * @private
 * @memberof PIXI
 */
function TextureUvs()
{
    this.x0 = 0;
    this.y0 = 0;

    this.x1 = 1;
    this.y1 = 0;

    this.x2 = 1;
    this.y2 = 1;

    this.x3 = 0;
    this.y3 = 1;

    this.xy0_uint32 = 0;
    this.xy1_uint32 = 0;
    this.xy2_uint32 = 0;
    this.xy3_uint32 = 0;
}

module.exports = TextureUvs;

/**
 * Sets the texture Uvs based on the given frame information
 * @param frame {PIXI.Rectangle}
 * @param baseFrame {PIXI.Rectangle}
 * @param rotate {boolean} Whether or not the frame is rotated
 * @private
 */
TextureUvs.prototype.set = function (frame, baseFrame, rotate)
{
    var tw = baseFrame.width;
    var th = baseFrame.height;

    if(rotate)
    {
        this.x0 = (frame.x + frame.height) / tw;
        this.y0 = frame.y / th;

        this.x1 = (frame.x + frame.height) / tw;
        this.y1 = (frame.y + frame.width) / th;

        this.x2 = frame.x / tw;
        this.y2 = (frame.y + frame.width) / th;

        this.x3 = frame.x / tw;
        this.y3 = frame.y / th;
    }
    else
    {

        this.x0 = frame.x / tw;
        this.y0 = frame.y / th;

        this.x1 = (frame.x + frame.width) / tw;
        this.y1 = frame.y / th;

        this.x2 = (frame.x + frame.width) / tw;
        this.y2 = (frame.y + frame.height) / th;

        this.x3 = frame.x / tw;
        this.y3 = (frame.y + frame.height) / th;
    }

    this.xy0_uint32 = (((this.y0 * 65535) & 0xFFFF) << 16) | ((this.x0 * 65535) & 0xFFFF);
    this.xy1_uint32 = (((this.y1 * 65535) & 0xFFFF) << 16) | ((this.x1 * 65535) & 0xFFFF);
    this.xy2_uint32 = (((this.y2 * 65535) & 0xFFFF) << 16) | ((this.x2 * 65535) & 0xFFFF);
    this.xy3_uint32 = (((this.y3 * 65535) & 0xFFFF) << 16) | ((this.x3 * 65535) & 0xFFFF);
};
