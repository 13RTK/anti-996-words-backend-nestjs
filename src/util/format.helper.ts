class FormatHelper {
  public static stringToJSON(textLine: string): string[] {
    const textArr: string[] = textLine.split('	');
    const curWord: string = textArr[0];

    textArr.shift();
    const leftText: string = textArr.join('	').trim();

    // const firstOpenParenthesisIdx = textLine.indexOf('(');
    // const lastOpenParenthesisIdx = textLine.lastIndexOf('(');
    // const parenthesisNumber =
    //   firstOpenParenthesisIdx === lastOpenParenthesisIdx ? 1 : 2;
    // const pMarkIdx = textLine.indexOf('\n');

    return [curWord, leftText];
  }
}

export default FormatHelper;
