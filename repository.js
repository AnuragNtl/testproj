/**
 * Assuming there is some ORM used to map entities to database columns
 * For now, using dummy data in place of actual database.
 */

export class Agent {

    constructor(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }
}

class Facility {
    constructor(id) {
        this.id = id;
    }

    setName(name) {
        this.name = name;
    }

    setEmail(email) {
        this.email = email;
    }

    getEmail() {
        return this.email;
    }
}


class Shift {
    constructor(id) {

    }
}




