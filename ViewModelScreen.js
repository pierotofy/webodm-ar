import React from 'react';
import ExpoGraphics from 'expo-graphics';
import ExpoTHREE, { THREE } from 'expo-three';
import { PanResponder, PixelRatio, View } from 'react-native';
import URL from 'url-parse';
import loadAsync from './libs/loadAsync';

class ViewModelScreen extends React.Component {
  static navigationOptions = {
    title: 'View Model'
  };

  constructor() {
    super();

    this.state = {
      loadingModel: true,
      error: "",
      task: {},
      apiBaseUrl: ""
    }
  }

  setBaseTaskUrl = async () => {
    const { params } = this.props.navigation.state;

    // Make sure the URL is valid
    const url = new URL(params.taskUrl);
    // if (url.protocol !== "https:") throw new Error("URL must be secure (accessible via HTTPS). Setup WebODM to use SSL.");
    
    let pathParts = url.pathname.split("/");

    // Truncate "/map/" or "/3d/" in the path if necessary
    // https://demo.webodm.org/3d/project/2/task/57bde61a-43fb-4447-b47a-9896498ddfba/map/
    if (["map", "3d"].indexOf(pathParts[pathParts.length - 2]) !== -1){
      pathParts = pathParts.slice(0, -2);
    }else{
      pathParts = pathParts.slice(0, -1);
    }

    // Just check for "/task/" in the path as basic validation
    if (pathParts[pathParts.length - 2] !== "task") throw new Error("This doesn't look like a WebODM task URL: " + params.taskUrl);

    // Construct url to retrieve task's JSON
    url.pathname = pathParts.join("/") + "/json/";
    const taskJsonUrl = url.toString();

    url.pathname = "/api";
    const apiBaseUrl = url.toString();


    const task = await (await fetch(taskJsonUrl)).json();
    if (task.id !== undefined){
      // TODO: check if 3D model is available

      this.setState({task, apiBaseUrl});
    }else{
      throw new Error("Invalid response: " + JSON.stringify(task));
    }
  }

  createApiUrl(path){
    const { apiBaseUrl, task } = this.state;
    return `${apiBaseUrl}/projects/${task.project}/tasks/${task.id}${path}`;
  }

  loadModel = async () => {
    // TODO: support for non-georeferenced model

    // const resources = {
    //   'odm_textured_model.mtl': this.createApiUrl('/assets/odm_texturing/odm_textured_model.mtl'),
    //   'odm_textured_model_geo.obj': this.createApiUrl('/assets/odm_texturing/odm_textured_model_geo.obj'),
    // };
    const resources = {
    // 'B-AO_iOS_HERO_Bruce_Wayne_Batman_Arkham_Origins_Body_D.png': require('./assets/test/batman/B-AO_iOS_HERO_Bruce_Wayne_Batman_Arkham_Origins_Body_D.png'),
    // 'B-AO_iOS_HERO_Bruce_Wayne_Batman_Arkham_Origins_Body_N.png': require('./assets/test/batman/B-AO_iOS_HERO_Bruce_Wayne_Batman_Arkham_Origins_Body_N.png'),
    // 'B-AO_iOS_HERO_Bruce_Wayne_Batman_Arkham_Origins_Body_S.png': require('./assets/test/batman/B-AO_iOS_HERO_Bruce_Wayne_Batman_Arkham_Origins_Body_S.png'),
    // 'B-AO_iOS_HERO_Bruce_Wayne_Batman_Arkham_Origins_Body_SP.png': require('./assets/test/batman/B-AO_iOS_HERO_Bruce_Wayne_Batman_Arkham_Origins_Body_SP.png'),
    // 'B-AO_iOS_HERO_Bruce_Wayne_Batman_Arkham_Origins_DM_ENV.png': require('./assets/test/batman/B-AO_iOS_HERO_Bruce_Wayne_Batman_Arkham_Origins_DM_ENV.png'),
    // 'B-AO_iOS_HERO_Bruce_Wayne_Batman_Arkham_Origins.mtl': require('./assets/test/batman/B-AO_iOS_HERO_Bruce_Wayne_Batman_Arkham_Origins.mtl'),
    // 'B-AO_iOS_HERO_Bruce_Wayne_Batman_Arkham_Origins.obj': require('./assets/test/batman/B-AO_iOS_HERO_Bruce_Wayne_Batman_Arkham_Origins.obj'),

      'odm_textured_model_geo.obj': require("./assets/test/odm_textured_model_geo.obj"),
      'odm_textured_model.mtl': require("./assets/test/odm_textured_model.mtl"),
    
      'odm_textured_model_material0000_map_Kd.png': require("./assets/test/odm_textured_model_material0000_map_Kd.png"),
      'odm_textured_model_material0001_map_Kd.png': require("./assets/test/odm_textured_model_material0001_map_Kd.png"),
      'odm_textured_model_material0002_map_Kd.png': require("./assets/test/odm_textured_model_material0002_map_Kd.png"),
      'odm_textured_model_material0003_map_Kd.png': require("./assets/test/odm_textured_model_material0003_map_Kd.png"),
      'odm_textured_model_material0004_map_Kd.png': require("./assets/test/odm_textured_model_material0004_map_Kd.png"),
      'odm_textured_model_material0005_map_Kd.png': require("./assets/test/odm_textured_model_material0005_map_Kd.png"),
      'odm_textured_model_material0006_map_Kd.png': require("./assets/test/odm_textured_model_material0006_map_Kd.png"),
    };

    // We need to retrieve and parse the MTL
    // file to know all the textures paths
    // mtl = await (await fetch(
    //                 resources['odm_textured_model.mtl']
    //               )).text();
    // const pngRegex = /^.+\s+(.+\.png|.+\.jpg|.+\.jpeg)$/i;

    // mtl.split("\n").forEach(line => {
    //   const matches = line.match(pngRegex);
    //   if (matches){
    //     const filename = matches[1];
    //     resources[filename] = this.createApiUrl(`/assets/odm_texturing/${filename}`);
    //   }
    // });

    // TODO: this REALLY slow
    const mesh = await loadAsync(
      [
        resources['odm_textured_model.mtl'],
        resources['odm_textured_model_geo.obj'],
        // resources['B-AO_iOS_HERO_Bruce_Wayne_Batman_Arkham_Origins.obj'],
        // resources['B-AO_iOS_HERO_Bruce_Wayne_Batman_Arkham_Origins.mtl'],
      ],
      () => {},
      name => resources[name]
    );

    // if (mesh.children.length > 0){
    //   const geom = mesh.children[0].geometry;

    //   // Compute center
    //   geom.computeBoundingBox();

    //   const center = geom.boundingBox.getCenter();

    //   mesh.translateX(-center.x);
    //   mesh.translateY(-center.y);
    //   mesh.translateZ(-center.z);
    // } 

    mesh.position.set(0, 0, 400);
    mesh.rotateX(THREE.Math.degToRad(180));
    
    // mesh.position.set(0, 0, 5);
    // mesh.rotateY(THREE.Math.degToRad(180));
    
    this.scene.add(mesh);

    // await ExpoTHREE.loadAsync(resources['odm_textured_model_geo.obj']);
    // await ExpoTHREE.loadAsync(
    //   [
    //     require('./assets/test/odm_textured_model_geo.obj'),
    //     require('./assets/test/odm_textured_model.mtl')
    //   ]);

    
    // let r = await ExpoTHREE.loadAsync("http://192.168.2.253:8000/api/projects/4/tasks/9d720d6e-c50c-4f06-9c2f-bdbc79a43a9a/assets/odm_texturing/odm_textured_model_material0006_map_Kd.png");
    // console.log(r.image);

    // const basePath = this.createApiUrl('/assets/odm_texturing/');

    // require('expo-three/lib/loaders/MTLLoader');
    // THREE.MTLLoader.MaterialCreator.prototype.loadTexture = (baseUrl, url, mapping, onLoad, onProgress, onError) => {
    //   const tex = new THREE.Texture();
    //   console.log("loading ", baseUrl + url);
    //   fetch(this.createApiUrl(baseUrl + url)).then(response => {
    //     console.log("Response", response);
    //     response.blob().then(image => {
    //       tex.image = image;

    //       // JPEGs can't have an alpha channel, so memory can be saved by storing them as RGB.
    //       var isJPEG = url.search( /\.(jpg|jpeg)$/ ) > 0 || url.search( /^data\:image\/jpeg/ ) === 0;
    //       tex.format = isJPEG ? RGBFormat : RGBAFormat;
    //       tex.needsUpdate = true;

    //       console.log("LOADED ", tex, url);

    //       onLoad(tex);
    //     });
    //   });

    //   if (mapping !== undefined) tex.mapping = mapping;
    //   return tex;
    // };
    // const mtlLoader = new THREE.MTLLoader();
    // mtlLoader.setTexturePath(basePath);
    // mtlLoader.setPath(basePath);

    // const materials = mtlLoader.parse(resources['odm_textured_model.mtl']);

    // materials.preload();
    
    // require('three/examples/js/loaders/OBJLoader');
    // const objLoader = new THREE.OBJLoader();
    // objLoader.setMaterials(materials);
    // objLoader.setPath(basePath);
    // const objFile = await (
    //               await fetch(
    //                 this.createApiUrl('/assets/odm_texturing/odm_textured_model.obj')
    //               )).text();
    // mesh = objLoader.parse(objFile);

    // // // Bring the model close to center
    // if (mesh.children.length > 0){
    //   const geom = mesh.children[0].geometry;

    //   // Compute center
    //   geom.computeBoundingBox();

    //   const center = geom.boundingBox.getCenter();

    //   mesh.translateX(-center.x);
    //   mesh.translateY(-center.y);
    //   mesh.translateZ(-center.z);
    // } 


    // console.log(textureFiles);
  }

  componentWillMount() {
    THREE.suppressExpoWarnings(true);
  }

  render() {
    const { params } = this.props.navigation.state;

    return (
      <View style={{ flex: 1 }}>
        <ExpoGraphics.View
          pointerEvents="none"
          style={{ flex: 1 }}
          onContextCreate={this.onContextCreate}
          onRender={this.onRender}
          onResize={this.onResize}
          arEnabled
        />
      </View>
    );
  }

  onContextCreate = async (gl, arSession) => {
    this.arSession = arSession;
    const { drawingBufferWidth, drawingBufferHeight } = gl;
    const scale = PixelRatio.get();

    const width = drawingBufferWidth / scale;
    const height = drawingBufferHeight / scale;

    // renderer
    this.renderer = ExpoTHREE.createRenderer({
      gl,
    });
    this.renderer.setPixelRatio(scale);
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x000000, 1.0);

    /// Standard Camera
    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 10000);
    this.camera.lookAt(new THREE.Vector3(0, 0, 5));

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);
    this.scene.add(new THREE.GridHelper(5, 6, 0xffffff, 0x555555));

    this.setupLights();

    // AR Background Texture
    // this.scene.background = ExpoTHREE.createARBackgroundTexture(arSession, this.renderer);

    /// AR Camera
    // this.camera = ExpoTHREE.createARCamera(arSession, width, height, 0.01, 1000);

    /// Enable ARKit light estimation
    ExpoTHREE.setIsLightEstimationEnabled(arSession, true);

    /// Enable ARKit plane detection - this will let us get the raw point data
    ExpoTHREE.setIsPlaneDetectionEnabled(arSession, true);

    try{
      await this.setBaseTaskUrl();
      await this.loadModel();
    }catch(e){
      alert(e.message);
      this.setState({error: e.message});
    }
  };

  setupLights = () => {
    // lights
    const directionalLightA = new THREE.DirectionalLight(0xffffff);
    directionalLightA.position.set(1, 1, 1);
    this.scene.add(directionalLightA);

    const directionalLightB = new THREE.DirectionalLight(0xffffff);
    directionalLightB.position.set(-1, -1, -1);
    this.scene.add(directionalLightB);

    const ambientLight = new THREE.AmbientLight(0x222222);
    this.scene.add(ambientLight);
  };

  onResize = ({ width, height }) => {
    if (this.camera){
      const scale = PixelRatio.get();

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setPixelRatio(scale);
      this.renderer.setSize(width, height);
    }
  };

  onRender = () => {
    const lightEstimation = ExpoTHREE.getARLightEstimation(this.arSession);
    if (lightEstimation) {
      // this.directionalLightA.intensity = 1 / 2000 * lightEstimation.ambientIntensity;
      // this.light.ambientIntensity = lightEstimation.ambientColorTemperature;
    }

    const { scene, renderer, camera } = this;
    renderer.render(scene, camera);
  };
}

export default ViewModelScreen;