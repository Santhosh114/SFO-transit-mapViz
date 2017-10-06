interface Scripts {
   name: string;
   src: string;
}
export const ScriptStore: Scripts[] = [
   {name: 'mappingFunctions', src: './assets/drawBaseMap.js'},
   {name: 'mappingFunctionsts', src: './src/app/visualization/map/utility-functions/drawBaseMap.ts'}
];
    // Usage
    // private loader: ScriptService,
    // this.loader.load('mappingFunctions', 'mappingFunctionsts').then(data => {
    //   console.log('script loaded ', data);
    // }).catch(error => console.log(error));

    // For global Window obj setting & getting
    // import { WindowRefService } from '../../global-services/window-ref.service';
    // public windowRef: WindowRefService this._window = windowRef.nativeWindow;
