/*******Basic Typescript********/
declare const pizzas: {
    name: string;
    topping: string[];
}[];
declare const mappedPizzas: string[];
declare const pizza: {
    name: string;
    getName: () => void;
};
/********Understanding This**********/
declare const myObj: {
    myMethod(): void;
};
declare function myFunction(): void;
declare function handleClick(this: HTMLAnchorElement, event: Event): void;
/********Type of query**********/
declare const person: {
    name: string;
    age: number;
};
type Person = typeof person;
declare const anotherPerson: Person;
/*********Keyof Index Type Queries*********/
type PersonKeys = keyof Person;
/********Type safe lookup**********/
type PersonTypes = Person[PersonKeys];
/*******Keyof Generics and lookup********/
declare function getProperty<T, K extends keyof T>(obj: T, key: K): T[K];
declare const personName: string;
declare const personAge: number;
/******Readonly Mapped type*******/
interface Person2 {
    name: string;
    age: number;
}
declare const person2: Person2;
type MyReadonly<T> = {
    readonly [P in keyof T]: T[P];
};
declare function freeze<T>(obj: T): MyReadonly<T>;
declare const newPerson: MyReadonly<Person2>;
/*******Partial Mapped Type********/
type MyPartial<T> = {
    [P in keyof T]?: T[P];
};
declare function updatePerson(person: Person2, prop: MyPartial<Person2>): {
    name: string;
    age: number;
};
/*******Requires Mapped Type********/
interface Person3 {
    name: string;
    age?: number;
}
type MyRequired<T> = {
    [P in keyof T]-?: T[P];
};
declare function printAge(person: Required<Person3>): string;
declare const person4: Required<Person3>;
declare const age: string;
/******Pick Mapped Type********/
interface Person4 {
    name: string;
    age: number;
}
type MyPick<T, K extends keyof T> = {
    [P in K]: T[P];
};
declare const person5: MyPick<Person4, 'name' | 'age'>;
/****Record Mapped Type*******/
declare let dictionary: Record<string, TrackStates>;
interface TrackStates {
    current: string;
    next: string;
}
declare const item: Record<keyof TrackStates, string>;
/****Typeof and Type Guards******/
declare class Song {
    title: string;
    duration: string | number;
    constructor(title: string, duration: string | number);
}
declare function getSongDuration(item: Song): string;
declare const songDurationFromString: string;
declare const songDurationFromMs: string;
/*****Intance of and Type Guard*****/
declare class Foo {
    bar(): void;
}
declare const bar: Foo;
declare class Song2 {
    title: string;
    duration: number;
    constructor(title: string, duration: number);
}
declare class Playlist {
    name: string;
    songs: Song[];
    constructor(name: string, songs: Song[]);
}
declare function getItemName(item: Song2 | Playlist): string;
declare const songName: string;
declare const playListName: string;
/***** User Defined Type Guard *****/
declare function isSong(item: any): item is Song2;
declare function getItemName2(item: Song2 | Playlist): string;
/*** Literal Type Guards and 'in' Operator****/
declare function isSong2(item: any): item is Song2;
/****** Intersection Types ***********/
interface Order {
    id: string;
    amount: number;
    currency: string;
}
interface Stripe {
    type: 'stripe';
    card: string;
    cvc: string;
}
interface PayPal {
    type: 'paypal';
    email: string;
}
type CheckoutCard = Order & Stripe;
type CheckoutPayPal = Order & PayPal;
declare const order: Order;
declare const orderCard: CheckoutCard;
declare const orderPaypal: CheckoutPayPal;
declare const assigned: Order & Stripe;
/*** Discriminated Tagged Unions****/
type Payload = CheckoutCard | CheckoutPayPal;
declare function checout(payload: Payload): void;
/***** Interfaces Vs Type Aliases ****/
interface Item {
    name: string;
}
interface Artist extends Item {
    songs: Number;
}
interface Artist {
    getSongs(): number;
}
type Artist2 = {
    name: string;
} & Item;
declare const newArtis: Artist;
/****  Classes Vs Interfaces ******/
interface Artists {
    name: string;
}
declare class ArtistCreator implements Artists {
    name: string;
    constructor(name: string);
}
declare function artistFactory({ name }: Artists): ArtistCreator;
/**** Function Generics ****/
declare class Pizza {
    private name;
    private price;
    constructor(name: string, price: number);
}
declare class List<T> {
    private list;
    addItem(item: T): void;
    getList(): T[];
}
declare const list: List<Pizza>;
declare const piz_zas: Pizza[];
declare class Cupon {
    private name;
    constructor(name: string);
}
declare const anotherList: List<Cupon>;
/***** Function Overloads *****/
declare function reverse(str: string): string;
declare function reverse<T>(arr: T[]): T[];
/****** Numerics Enunms and Reverse Mapping *****/
declare enum Sizes {
    Small = 0,
    Medium = 1,
    Large = 2
}
declare enum Sizes {
    ExtraLarge = 3
}
declare const selectedSize = 2;
/****** String Enums And Inlining Members *******/
declare enum Sizes2 {
    Small = "small",
    Medium = "medium",
    Large = "large"
}
declare let selected: Sizes2;
declare function updateSize(size: Sizes2): void;
