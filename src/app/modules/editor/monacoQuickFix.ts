
function setQuickFixposition(fix, marker) {
  let quickFix = marker;

  if (fix === null) {
    return quickFix;
  }

  quickFix.startLineNumber = fix.position?.startLineNumber;
  quickFix.startColumn = fix.position?.startColumn;
  quickFix.endLineNumber = fix.position?.endLineNumber;
  quickFix.endColumn = fix.position?.endColumn;

  return quickFix;
}

function constructMonacoQuickFix(monacoModel, fix, marker) {

  const setNewMarker = fix?.message !== marker?.message || fix?.position !== marker?.position;

  marker = setNewMarker ? setQuickFixposition(fix, marker) : marker;

  if (fix === null) {
    return null;
  }

  return {
    title: fix.title, //quickfix button title
    diagnostics:[marker],
    kind: "quickfix",
    edit: {
        edits: [
            {
              resource: monacoModel.uri,
              edits: [
                {
                  range: marker, //marker, with fix position
                  text: fix.text //quickfix VHDL code
                },
              ]
            }
        ]
    },
    isPreferred: true
  };
}

export function getQuickFixActions(monacoModel, editorMarker, quickfixes) {
  for (let i = 0; i < quickfixes.length; i++) {
    const fix = quickfixes[i];
    if (fix === null || fix === undefined) {
      continue;
    }

    if (editorMarker.message === fix.message) {
      const action = constructMonacoQuickFix(monacoModel, fix, editorMarker);

      if (action) {
        return action;
      }
    }
  }

  return null;
}
