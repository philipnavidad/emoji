AFRAME.registerSystem('cached-material', {
  init: function () {
    this.materials = new Map();
  },
  makeKey: function (data) {
    return [
      data.src, 
      data.transparent
    ].join('-');
  },
  getOrCreate: function (data) {
    var key = this.makeKey(data);
    if (!this.materials.has(key)) {
      var params = {
	transparent: data.transparent,
      }
      if (data.src) {
	params.map = new THREE.Texture({src: data.src.src});
      }
      this.materials.set(key, new THREE.MeshBasicMaterial(params));
    }
    return this.materials.get(key);
  }
});
AFRAME.registerComponent('cached-material', {
  schema: {
    src: { type: 'selector' },
    transparent: { type: 'boolean' }
  },
  init: function () {
    var cachedMaterial = this.system.getOrCreate(this.data);
    this.el.object3DMap.mesh.material = cachedMaterial;
  }
});
