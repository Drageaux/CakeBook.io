export class Cake {
    constructor(
        public _id:number,
        public user:string,
        public name:string,
        public image:string,
        public croppedImage:string,
        public servings:number,
        public readyInMinutes:number,
        public preparationMinutes:number,
        public cookingMinutes:number,
        public description:string,
        public ingredients:Object[],
        public steps:Object[]
    ) { }
}