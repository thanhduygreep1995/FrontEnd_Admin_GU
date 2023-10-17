export class Spec {
   id: number; 
   processor: string;
   graphicsCard: string;
   ram: string;
   storage: string;
   display: string;
   operatingSystem: string;
   camera: string;
   constructor(
      id: number,
      processor: string,
      graphicsCard: string,
      ram: string,
      storage: string,
      display: string,
      operatingSystem: string,
      camera: string,
    ) {
      this.id = id;
      this.processor = processor;
      this.graphicsCard = graphicsCard;
      this.ram = ram;
      this.storage = storage;
      this.display = display;
      this.operatingSystem = operatingSystem;
      this.camera = camera;
    }
}