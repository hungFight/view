import { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Button, Dropdown, Flex, Table } from 'antd'
function App() {
  // {
  //   "id": string,
  //     "league_id": number,
  //       "date": string,
  //         "title": string,
  //           "hour": string,
  //             "ordinal_number": string,
  //               "venue": string,
  //                 "home": string,
  //                   "away": string,
  //                     "score": string,
  //                       "channel": string,
  //                         "audience": string
  // }
  const [dataSource, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [directory, setDirectory] = useState('biaSaoVang')
  useEffect(() => {
    setLoading(true)
    const res = fetch(`${ process.env.REACT_APP_URL }crawl/${ directory }`).then(response => response.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(error => console.error(error));
  }, [directory])

  const columns = [{
    title: 'Số thứ tự',
    dataIndex: 'ordinal_number',
    key: 'ordinal_number',
  },
  {
    title: 'Ngày tháng',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Giờ',
    dataIndex: 'hour',
    key: 'hour',
  },
  {
    title: 'Sân vận động',
    dataIndex: 'venue',
    key: 'venue',
  },
  {
    title: 'Đội nhà',
    dataIndex: 'home',
    key: 'home',
  },
  {
    title: 'Điểm',
    dataIndex: 'score',
    key: 'score',
  }, {
    title: 'Đội khách',
    dataIndex: 'away',
    key: 'away',
  },
  {
    title: 'Kênh phát sóng',
    dataIndex: 'channel',
    key: 'channel',
  },
  {
    title: 'Lượng người theo dõi',
    dataIndex: 'audience',
    key: 'audience',
  },

  ];
  return (
    <div style={ {
      paddingTop: '70px',
      backgroundColor: '#212121'
    } }>
      <h3 style={ { textAlign: 'center', color: 'white' } }>Thong Tin bong da</h3>
      <div style={ { display: 'flex', alignItems: 'center', marginBottom: '30px', width: '100%', justifyContent: 'center' } }>
        <div style={ {
          paddingBottom: directory === 'biaSaoVang' ? '10px' : '', width: 'fit-content',
          borderBottom: directory === 'biaSaoVang' ? '1px solid white' : '',
          marginRight: '10px'
        } }> <Button type="primary" style={ { width: 'fit-content', } } onClick={ () => setDirectory('biaSaoVang') }>Bia Sao Vàng</Button></div>
        <div style={ {
          paddingBottom: directory === 'Casper' ? '10px' : '', width: 'fit-content',
          borderBottom: directory === 'Casper' ? '1px solid white' : '',
          marginRight: '10px'
        } }>
          <Button type="primary" danger style={ { width: 'fit-content', } } onClick={ () => setDirectory('Casper') }>
            Casper
          </Button>
        </div> <div style={ {
          paddingBottom: directory === 'Nightwolf' ? '10px' : '', width: 'fit-content',
          borderBottom: directory === 'Nightwolf' ? '1px solid white' : '',
          marginRight: '10px'
        } }><Button type="default" danger style={ { width: 'fit-content' } } onClick={ () => setDirectory('Nightwolf') }>

            Nightwolf
          </Button></div>
      </div>
      {
        !loading ? dataSource.length ? dataSource.sort((a, b) => a.index - b.index).map((data, index) => <div key={ data.id + '-' + index } style={ { marginBottom: '10px', backgroundColor: '#555555' } }>
          <div style={ { width: '80%', margin: 'auto', textAlign: 'center', padding: '10px', color: 'white' } }>{ data.title }</div>
          <div style={ { width: '80%', margin: 'auto' } }>
            <Table dataSource={ [data] } columns={ columns } />;
          </div>
        </div>) : <p style={ { textAlign: 'center', color: 'white', padding: '10px' } }>Không có data</p> : <p style={ { textAlign: 'center', color: 'white', padding: '10px' } }>Loading...</p>
      }
    </div >
  )
}

export default App;
