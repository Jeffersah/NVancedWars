module Extensions

module List =
    let takeAtMost n items =
        if List.length items <= n then items
        else List.take n items