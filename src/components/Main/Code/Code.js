import React from "react";
import './Code.css';
import AceEditor from "react-ace-builds";
import "react-ace-builds/webpack-resolver-min";
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-ambiance';
import FileBtn from "../../Buttons/FileBtn";

export default function Code({ selectedCode, selectedProblem }) {
  const CodeEditorStyle = {width: '100%', height:'100%', border: '5px solid #3D3D3D', borderTop: '20px solid #3D3D3D'}

  return(
    <div className='code'>
      <div style={{width: '100%', height:'25px', backgroundColor: 'black', display: 'flex', justifyContent: 'flex-start'}}>
        <FileBtn />
        <FileBtn />
        <FileBtn />
        <FileBtn />
      </div>
      <div className="problems">
        {selectedProblem ? (
          <>
            <h3>10003번</h3>
            <div>{selectedProblem.description}</div>

            <table>
              <tbody>
                <tr>
                  <th>Time Limit</th>
                  <th>Fuel Limit</th>
                  <th>Initial Position</th>
                  <th>Initial Velocity</th>
                  <th>Initial Angle</th>
                </tr>
                <tr>
                  <td> {selectedProblem.timeLimit} ms</td>
                  <td> {selectedProblem.fuelLimit}</td>
                  <td> ({selectedProblem.initialX}, {selectedProblem.initialY})</td>
                  <td> ({selectedProblem.initialVelocityX}, {selectedProblem.initialVelocityY})</td>
                  <td> {selectedProblem.initialAngle} degrees</td>
                </tr>
              </tbody>
            </table>
          
            {selectedProblem.userDefined && <p>This is a user-defined problem.</p>}
            {selectedProblem.restrictedMethods && selectedProblem.restrictedMethods.length > 0 && (
              <div>
                <h4>Restricted Methods:</h4>
                <ul>
                  {selectedProblem.restrictedMethods.map((method, index) => (
                    <li key={index}>{method}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : (
          <div></div>
          //선택 안하면 아무것도 없음
        )}
      </div>
      <AceEditor
        style={CodeEditorStyle}
        id="editor"
        mode="javascript"
        theme="ambiance"
        name="code-editor"
        fontSize="14px"
        value={selectedCode}
        showPrintMargin={false}
        editorProps={{ $blockScrolling: true }}
      />
    </div>
  );
}