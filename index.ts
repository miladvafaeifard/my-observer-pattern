export interface Observer {
    notify(msg: string): void;
    getName(): string;
}

class Watcher implements Observer {
    constructor(private name: string){}

    public notify(msg: string): void {
        console.log(this.name + " notified." + " new " + msg);
    }

    public getName(): string {
        return this.name;
    }
}

class Subject {
    private observers: Observer[] = [];

    public append(observer: Observer): void {
        this.observers.push(observer);
    }

    public remove(observer: Observer): void {
        let index: number = this.observers.indexOf(observer);
        if(index > -1){
            let removedObserver: Observer = this.observers.splice(index, 1)[0];
            console.log('removed ' + removedObserver.getName());
        } else {
          console.error(observer.getName() + ' not found' );  
        }
    }

    public next(msg: string): void {
        this.observers.forEach( observer => observer.notify(msg))
    }
}

class IMBD extends Subject {
    private movies: string[] = [];

    public add(movie: string): void {
        this.movies.push(movie);
        this.next(movie);
    }

}


let milad : Watcher = new Watcher('Milad');

let imbd: IMBD = new IMBD();
imbd.append(milad);

imbd.add("Die hard");
imbd.add("Matrix");

let sara : Watcher = new Watcher('Sara');
imbd.append(sara);
imbd.add("Gone");

let szandi : Watcher = new Watcher('Szandi');
imbd.append(szandi);
imbd.add("Endless love");

imbd.remove(milad);

imbd.add("Matrix II");



