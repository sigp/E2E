
export const SEND_MSG = 'SEND_MSG';

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

