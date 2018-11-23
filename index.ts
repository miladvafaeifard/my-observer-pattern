const FG_YELLOW = '\x1b[33m';
const FG_BLUE = "\x1b[34m"
const RESET = "\x1b[0m";
const line = '*'.repeat(20);
export interface Observer {
    notify(value?: string, subject?: Subject): void;
    getName(): string;
}

class Watcher implements Observer {
 
    constructor(private name: string){}

    public notify(value?: string, subject?: Subject): void {
        console.log("\n" + FG_YELLOW + this.name + 'received : ' + RESET + " " + value + "\n",
        FG_YELLOW + " from :" + RESET , subject , "\n\n" + line);
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
        if(~index){
            let removedObserver: Observer = this.observers.splice(index, 1)[0];
            console.log('removed ' + removedObserver.getName());
        } else {
          console.error(observer.getName() + ' not found' );  
        }
    }

    public next(msg?: string): void {
        this.observers.forEach( observer => observer.notify(msg, this));
    }
    
}

class IMBD extends Subject {
    private movies: string[] = [];

    public add(movie: string): void {
        this.movies.push(movie);
        this.next(movie);
    }

}

class NewsPublisher extends Subject {
    private newsList: string[] = [];

    public add(movie: string): void {
        this.newsList.push(movie);
        this.next(movie);
    }

}


let milad : Watcher = new Watcher('Milad');

let imbd: IMBD = new IMBD();
let newsPublisher: NewsPublisher = new NewsPublisher();
imbd.append(milad);
newsPublisher.append(milad);

imbd.add("Die hard");
imbd.add("Matrix");

let sara : Watcher = new Watcher('Sara');
imbd.append(sara);
imbd.add("Gone");

let szandi : Watcher = new Watcher('Szandi');
imbd.append(szandi);
newsPublisher.append(szandi);
imbd.add("Endless love");

imbd.remove(milad);

imbd.add("Matrix II");




newsPublisher.add("Tomorrow will be raining.");
imbd.add("Bad Ass");
imbd.add("Matrix III");
newsPublisher.add("Github is being acquired by Microsoft");
imbd.add("Inspection");
newsPublisher.add("an accident had happened.");
