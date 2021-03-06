/* global AFRAME */

// create and register custom components
export const registerSceneComponents = () => {

  // attach this to both markers to dynamically update line position
  AFRAME.registerComponent('line-position-updater', {

    schema: {
      // which line to update
      target: { type: 'selector' },
      // node to display distance
      textNode: { type: 'selector' },
    },

    tick: function() {
      // get markers positions
      const markerA = document.querySelector('a-marker[preset="hiro"]');
      const markerB = document.querySelector('a-marker[preset="kanji"]');

      // what if markers or line arent rendered yet?
      if (!markerA || !markerB || !this.data.target || !this.data.textNode) {
        console.log('something went wrong');
        return;
      }

      // render new line params
      this.data.target.setAttribute('line', {
        start: markerA.object3D.position,
        end: markerB.object3D.position,
        color: 'yellow',
      });

      // render new distance
      this.data.textNode.setAttribute('value', markerA.object3D.position.distanceTo(markerB.object3D.position));
      // this.data.textNode.setAttribute('position', '0 0 1');
    }
  });

  // looks like duplicate of built-in 'visible' component
  // // display line only when both markers are active
  // AFRAME.registerComponent('markers-dependent', {
  //   // is component visible
  //   schema: { type: 'boolean', default: false },
  //
  //   // hide component by default
  //   init: function() {
  //     this.el.object3D.visible = false;
  //   },
  //
  //   // hide and display line when markers are in/out
  //   update: function(oldData) {
  //     if (!oldData && this.data) {
  //       this.el.object3D.visible = true;
  //       this.visible = true;
  //     } else if (oldData && !this.data) {
  //       this.el.object3D.visible = false;
  //       this.visible = false;
  //     }
  //   },
  // });

}
