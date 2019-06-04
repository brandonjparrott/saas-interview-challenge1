import { expect } from 'chai';
import 'mocha';
import { isPalindrome } from '../../src/services/isPalindrome';

describe('isPalindrome', () => {

    it('should return true', () => {
        let result = isPalindrome('racecar');
        expect(result).to.be.true;
    });

    it('should return false', () => {
        let result = isPalindrome('palindrome');
        expect(result).to.be.false;
    });

});