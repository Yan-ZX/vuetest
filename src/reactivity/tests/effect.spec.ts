import { add } from '../index';

describe("effect", () => {
    it('happy path', () => {
        const user = reacvive({
            age: 10
        })

        let nextAge;
        effect(() => {
            nextAge = user.age + 1;
            console.log(nextAge)
        })

        expect(nextAge).toBe(11)

        //update
        user.age++;
        expect(nextAge).toBe(12)
    })
})