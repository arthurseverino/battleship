const { Carrier, Battleship, Cruiser, Submarine, Destroyer } =
  require('./index').default;

describe('Ship classes', () => {
  test('Carrier should have length 5', () => {
    const carrier = new Carrier();
    expect(carrier.length).toBe(5);
  });

  test('Battleship should have length 4', () => {
    const battleship = new Battleship();
    expect(battleship.length).toBe(4);
  });

  test('Cruiser should have length 3', () => {
    const cruiser = new Cruiser();
    expect(cruiser.length).toBe(3);
  });

  test('Submarine should have length 3', () => {
    const submarine = new Submarine();
    expect(submarine.length).toBe(3);
  });

  test('Destroyer should have length 2', () => {
    const destroyer = new Destroyer();
    expect(destroyer.length).toBe(2);
  });
});
