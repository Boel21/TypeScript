/*******Basic Typescript********/
const pizzas = [{name: 'peperoni', topping: ['peperoni']}];

const mappedPizzas = pizzas.map(pizza => pizza.name.toUpperCase());

console.log(mappedPizzas);

const pizza = {
    name: 'Blzing Inferno',
    getName: function() {console.log(this)}
    
}

console.log(pizza.getName());

/********Understanding This**********/
const myObj = {
    myMethod(){
        console.log("Object::::", this);
    }
}

function myFunction(){
    console.log("Function:::",this);
}

myFunction();
myFunction.call(myObj);
myFunction.call([]);

//Non implicit This
//const elem = document.querySelector('.click');

function handleClick(this: HTMLAnchorElement, event: Event){
    event.preventDefault();
}

//elem?.addEventListener('click', handleClick, false);

/********Type of query**********/

const person = {
    name: 'Joel',
    age: 34
}

type Person = typeof person;

const anotherPerson: Person = {
    name: 'Joel2',
    age: 34
}

/*********Keyof Index Type Queries*********/
type PersonKeys = keyof Person; // Union type name | Age

/********Type safe lookup**********/
type PersonTypes = Person[PersonKeys]; //string | number

/*******Keyof Generics and lookup********/
function getProperty<T,K extends keyof T>(obj: T , key: K){
    return obj[key];
}

const personName = getProperty(person,'name'); //string
const personAge = getProperty(person, 'age') //number

/******Readonly Mapped type*******/
interface Person2{
    name: string;
    age: number;
}

// interface ReadonlyPerson {
//     readonly name: string;
//     readonly age: number;
// }

const person2: Person2 = {
    name: 'Tood',
    age: 27
}

type MyReadonly<T> = {
    readonly [P in keyof T]: T[P];
}

function freeze<T>(obj: T):MyReadonly<T>{
    return Object.freeze(obj);
}

const newPerson = freeze(person2);

/*******Partial Mapped Type********/
// interface PartialPerson {
//     name?: string;
//     age?: number;
// }
type MyPartial<T> = {
    [P in keyof T]?: T[P];
}

function updatePerson(person: Person2, prop: MyPartial<Person2>){
    return {...person, ...prop}
}   

updatePerson(person,{name: 'ABC'})

/*******Requires Mapped Type********/
interface Person3 {
    name: string;
    age?: number;
}
type MyRequired<T> = {
    [P in keyof T]-?: T[P]; //remove the optional ? properties
    //[P in keyof T]+?: T[P]; //add the optional ? properties
}

function printAge(person: Required<Person3>){
    return `${person.name} is ${person.age}`;
}

const person4: Required<Person3> = {
    name: 'Joel5',
    age:34,
}

const age = printAge(person4);

/******Pick Mapped Type********/
interface Person4 {
    name: string;
    age: number;
}

type MyPick<T, K extends keyof T> = {
    [P in K]: T[P];
}


const person5: MyPick<Person4, 'name' | 'age'> = {
    name: 'Joel5',
    age:34,
}

/****Record Mapped Type*******/
let dictionary:Record<string, TrackStates> = {};

interface TrackStates {
    current: string;
    next: string;
}

const item: Record<keyof TrackStates, string> = {
    current: 'Current',
    next: 'Next',
}

//Number are coerced to string
dictionary[0]= item;

/****Typeof and Type Guards******/

// function foo(bar: string | number){
//     if(typeof bar === 'string'){
//         // string
//         return bar.toUpperCase();    
//     }
//     if(typeof bar === 'number'){
//         // number
//         return bar.toFixed(2);    
//     }
// }

class Song{
    constructor(public title: string, public duration: string | number){}


}

function getSongDuration(item: Song){
    if(typeof item.duration === 'string'){
        return item.duration;
    }
    const { duration } = item;
    const minutes = Math.floor(duration / 60000);
    const seconds = (duration / 1000 ) % 60;
    return `${minutes}:${seconds}`
}

const songDurationFromString = getSongDuration(new Song('Wonderfull Wonderfull', '05:31'));

console.log(songDurationFromString);

const songDurationFromMs = getSongDuration(new Song('Wonderfull Wonderfull',  330000));

console.log(songDurationFromMs);

/*****Intance of and Type Guard*****/
class Foo{
    bar(){

    }
}

const bar =  new Foo();
// console.log(bar instanceof Foo);
// console.log(Object.getPrototypeOf(bar) === Foo.prototype);
class Song2{
    constructor(public title: string, public duration: number){}
    
}

class Playlist {
    constructor(public name: string, public songs: Song[]){}
}

function getItemName(item: Song2 | Playlist){
    if(item instanceof Song2){
        return item.title;
    }
    return item.name;
}

const songName = getItemName(new Song2('Wonderful Wonderful', 300000));
console.log('Song name: ', songName);

const playListName = getItemName(new Playlist('The Best Songs',[new Song2('The Man', 300000)]))

console.log('Play List name: ', playListName);

/***** User Defined Type Guard *****/
function isSong(item: any): item is Song2{
    return item instanceof Song2;
}

function getItemName2(item: Song2 | Playlist){
    if(isSong(item)){
        return item.title;
    }
    return item.name;

}

/*** Literal Type Guards and 'in' Operator****/
//const exists = 'localStorage' in window;
function isSong2(item: any): item is Song2{
    return 'title' in item;
}

/****** Intersection Types ***********/
interface Order{
    id: string;
    amount: number;
    currency: string;
}

interface Stripe{
    type: 'stripe'; //for the discriminated unions
    card: string;
    cvc: string;
}

interface PayPal {
    type: 'paypal'; //for the discriminated unions
    email: string;
}

type CheckoutCard = Order & Stripe;
type CheckoutPayPal = Order & PayPal;

const order: Order = {
    id: 'loskjdf',
    amount: 100,
    currency: 'USD'
};

const orderCard: CheckoutCard = {
    ...order,
    type: 'stripe',//for the discriminated unions
    card: '1000 2000 3000 4000',
    cvc: '123',
};

const orderPaypal:CheckoutPayPal = {
    ...order,
    type: 'paypal', //for the discriminated unions,
    email: 'abc@gamail.com',
};

const assigned = Object.assign({}, order, orderCard);

/*** Discriminated Tagged Unions****/
type Payload = CheckoutCard | CheckoutPayPal;

function checout(payload: Payload){
    if(payload.type === 'stripe'){
        console.log(payload.card, payload.cvc);
    }
    if(payload.type === 'paypal'){
        console.log(payload.email);
    }

}

/***** Interfaces Vs Type Aliases ****/
interface Item {
    name: string;
}

interface Artist extends Item{
    songs: Number;
}

interface Artist {
    getSongs(): number;
}

type Artist2 = {
    name: string;
} & Item //Intersection tupe

const newArtis: Artist = {
    name: 'ABC',
    songs: 5,
    getSongs() {
        return this.songs;
    },
}

/****  Classes Vs Interfaces ******/
interface Artists {
    name: string;
}

class ArtistCreator implements Artists{
    constructor(public name: string){}
}

function artistFactory({name}: Artists){
    return new ArtistCreator(name);
}

artistFactory({name: 'Todd'});

/**** Function Generics ****/
class Pizza {
    constructor(private name: string, private price: number){}
}
class List<T> {
    private list: T[] = [];

    addItem(item: T): void {
        this.list.push(item);
    };

    getList(): T[]{
        return this.list;
    };
}

const list = new List<Pizza>();

list.addItem(new Pizza('Peperoni', 15));

const piz_zas = list.getList();

class Cupon {
    constructor(private name: string) {
        
    }
}

const anotherList = new List<Cupon>();
anotherList.addItem(new Cupon('Pizza25'));

/***** Function Overloads *****/
function reverse(str: string): string;
function reverse<T>(arr: T[]): T[];

function reverse<T>(stringOrArray: string | T[]): string | T[]{
    if(typeof stringOrArray === 'string'){
        return stringOrArray
                .split('')
                .reverse()
                .join()
    }

    return stringOrArray.slice().reverse();
}

reverse('Pepperoni');
reverse(['Bacon','pepperoni','chili','mushrooms']);

/****** Numerics Enunms and Reverse Mapping *****/
enum Sizes {
    Small,
    Medium,
    Large
}

enum Sizes{
    ExtraLarge = 3
}

const selectedSize = 2;

console.log(Sizes[selectedSize]); // output Large
console.log(Sizes.Medium); // output 1
console.log(Sizes.Large, Sizes[Sizes.Large]); // output 2, 'Lagrge' --> Reverse mapping

/****** String Enums And Inlining Members *******/
enum Sizes2 {
    Small = 'small',
    Medium = 'medium',
    Large = 'large'
}

let selected: Sizes2 = Sizes2.Small;

function updateSize(size: Sizes2): void{
    selected = size;
}

updateSize(Sizes2.Large);
console.log(selected);
