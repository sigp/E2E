
export const SEND_MSG = 'SEND_MSG';
export const ENCRYPT_TOGGLE = 'ENCRYPT_TOGGLE';

/* 
 * Action creators 
 *
 */

export function sendMessage(rawData) {
  return {
    type: SEND_MSG, 
    rawData
  }
}

export function encryptToggle() { return { type: ENCRYPT_TOGGLE } };

