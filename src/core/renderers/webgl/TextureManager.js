var GLTexture = require('pixi-gl-core').GLTexture,
	utils = require('../../utils');

/**
 * Helper class to create a webGL Texture
 *
 * @class
 * @memberof PIXI
 * @param gl {WebGLRenderingContext}
 */

var TextureManager = function(gl)
{
	this.gl = gl;

	// track textures in the renderer so we can no longer listen to them on destruction.
	this._managedTextures = [];
    this.glTextures = {};

}

TextureManager.prototype.bindTexture = function(texture)
{

}


TextureManager.prototype.getTexture = function(texture)
{

}

/**
 * Updates and/or Creates a WebGL texture for the renderer's context.
 *
 * @param texture {PIXI.BaseTexture|PIXI.Texture} the texture to update
 */
TextureManager.prototype.updateTexture = function(texture)
{
	texture = texture.baseTexture || texture;

	if (!texture.hasLoaded)
    {
        return;
    }

    
    var gl = this.gl;
    var glTexture = this.glTextures[texture.uid]//texture._glTextures[gl.id];

    if (!glTexture)
    {
        glTexture = new GLTexture(gl);
        
        texture._glTextures[gl.id] = glTexture;

       // this.glTextures[texture.uid] = glTexture;

        texture.on('update', this.updateTexture, this);
        texture.on('dispose', this.destroyTexture, this);
        
        this._managedTextures.push(texture);
    }

    glTexture.upload(texture.source);
    glTexture.enableWrapClamp();

    // TODO check for scaling type
    glTexture.enableLinearScaling();

    return  texture._glTextures[gl.id];
}

/**
 * Deletes the texture from WebGL
 *
 * @param texture {PIXI.BaseTexture|PIXI.Texture} the texture to destroy
 */
TextureManager.prototype.destroyTexture = function(texture, _skipRemove)
{
	texture = texture.baseTexture || texture;

    if (!texture.hasLoaded)
    {
        return;
    }

    if (texture._glTextures[this.gl.id])
    {
        texture._glTextures[this.gl.id].destroy();
        texture.off('update', this.updateTexture, this);
        texture.off('dispose', this.destroyTexture, this);


        delete texture._glTextures[this.gl.id];

        if (!_skipRemove)
        {
            var i = this._managedTextures.indexOf(texture);
            if (i !== -1) {
                utils.removeItems(this._managedTextures, i, 1);
            }
        }
    }
}

TextureManager.prototype.destroyAll = function()
{
	// empty all the old gl textures as they are useless now
    for (var i = 0; i < this._managedTextures.length; ++i)
    {
        var texture = this._managedTextures[i];
        if (texture._glTextures[this.gl.id])
        {
            delete texture._glTextures[this.gl.id];
        }
    }
}

module.exports = TextureManager;

